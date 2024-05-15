import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'
import { TStyledIndicator } from './types'
import { EColors } from '../Styled'

export const styles = StyleSheet.create({
  main: {},
})

export const Progress = styled(View)`
  height: 5px;
  width: 100%;
  background-color: ${EColors.primary_L2};
  border-radius: 4px;
`

export const Indicator = styled(View)<TStyledIndicator>`
  height: 5px;
  border-radius: 4px;
  width: ${({ count, width, page }) => (width / count) * page}px;
  background-color: ${EColors.primary};
`
