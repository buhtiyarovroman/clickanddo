import styled from 'styled-components'
import { MARGIN, TMargin } from '../../utils'
import { EColors } from '../../Styled'
import { StyleSheet, TouchableOpacity } from 'react-native'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin & { isActive: boolean; size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ isActive }) => (isActive ? 0 : 1)}px solid ${EColors.grey_400};
  border-radius: 6px;
  ${props => MARGIN(props)};
`

export const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
})
