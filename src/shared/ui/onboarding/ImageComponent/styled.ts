import { Dimensions, StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'

const { width, height } = Dimensions.get('screen')

export const TextContainer = styled(View)`
  padding: 16px;
  background-color: ${EColors.primary};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 12px;
  width: 80%;

  position: absolute;
  bottom: -16px;
  right: -16px;
`

export const styles = StyleSheet.create({
  image: {
    width: width * 0.83,
    height: width * 0.83,
  },
})
