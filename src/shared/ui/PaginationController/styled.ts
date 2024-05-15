import { StyleSheet, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components'
import { FLEX } from '../utils'

export const styles = StyleSheet.create({
  main: {},
})
export const ActiveButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ disabled: boolean; isLeft?: boolean }>`
  position: absolute;
  ${({ isLeft }) =>
    isLeft
      ? css`
          left: 0px;
        `
      : css`
          right: 0px;
        `}
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  ${FLEX({})}
`
