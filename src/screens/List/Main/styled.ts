import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'

export const Wrapper = styled(View)`
  z-index: 5;
  align-self: center;
  position: absolute;
`

export const Container = styled(View)`
  margin-top: 10px;
  z-index: -1;
  height: 80%;
`

export const styles = StyleSheet.create({
  main: {
    paddingTop: 24,
  },
})
