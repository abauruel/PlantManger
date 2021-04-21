import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnvironmentButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title, active = false, ...rest
}: EnvironmentButtonProps) {
  return (
    <RectButton
      style={[style.container, active && style.containerActive]} {...rest}>
      <Text
        style={[style.text, active && style.textActive]}>
        {title}</Text>
    </RectButton>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    height: 40,
    width: 76,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text
  },
  containerActive: {
    backgroundColor: colors.green_light
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark
  }
})