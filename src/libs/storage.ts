import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'
import * as Notifications from 'expo-notifications'

export interface PlantProps {
  id: string,
  name: string,
  about: string,
  water_tips: string,
  photo: string,
  environments: [string],
  frequency: {
    times: number,
    repeat_every: string
  };
  hour: string,
  dateTimeNotification: Date;
}

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string
  }
}

export async function save(plant: PlantProps): Promise<void> {
  try {
    const nexTime = new Date(plant.dateTimeNotification)
    const now = new Date()

    const { times, repeat_every } = plant.frequency
    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times)
      nexTime.setDate(now.getDate() + interval)
    }
    else {
      nexTime.setDate(nexTime.getDate() + 1)
    }
    const seconds = Math.abs(Math.ceil(now.getTime() - nexTime.getTime()) / 1000)


    const settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) {
      await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌱',
        body: `Esta na hora de cuidar da sua ${plant.name}`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      }
    })

    const data = await AsyncStorage.getItem('@plantManager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    }

    await AsyncStorage.setItem('@plantManager:plants', JSON.stringify({
      ...newPlant,
      ...oldPlants
    }))
  }
  catch (error) {
    throw new Error(error)
  }
}
export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantManager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    const plantsSorted = Object.keys(plants).map((plant) => {
      return {
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
      }
    }).sort((a, b) =>
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 100 -
        Math.floor(new Date(b.dateTimeNotification).getTime() / 100)
      ))
    return plantsSorted

  }
  catch (error) {
    throw new Error(error)
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantManager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)
  delete plants[id]
  await AsyncStorage.setItem('@plantManager:plants', JSON.stringify(plants)
  )
}