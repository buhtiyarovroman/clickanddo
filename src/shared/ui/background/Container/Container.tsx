import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TContainerProps } from './types'

export const Container = ({
  children,
  containerStyle = {},
}: TContainerProps) => {
  return <View style={[styles.main, containerStyle]}>{children}</View>
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: 16,
  },
})
