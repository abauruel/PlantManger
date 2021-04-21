import React from 'react'

import {
  StyleSheet,
  Text,
  View, Image
} from 'react-native'
import colors from '../styles/colors'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import fonts from '../styles/fonts'

const imageAlex = 'https://avatars.githubusercontent.com/u/6122218?v=4'
export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>Alex</Text>
      </View>
      <Image
        source={{ uri: imageAlex }}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight()
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40
  }
})