import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components'

export const IconContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ isRight?: boolean }>`
  position: absolute;
  align-self: center;
  padding: 5px;
  z-index: 1000;
  ${({ isRight }) =>
    isRight
      ? css`
          right: 20px;
        `
      : css`
          left: 20px;
        `}
`
