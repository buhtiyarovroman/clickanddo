import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Container = styled(GestureHandlerRootView)``
export const DotContainer = styled(View)``

export const styles = StyleSheet.create({
  dotStyle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 2,
  },
  containerStyle: {},
})
