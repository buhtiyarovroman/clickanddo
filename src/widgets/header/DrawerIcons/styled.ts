import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity, View } from 'react-native'
import styled, { css } from 'styled-components'

export const NotificationContainer = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: ${EColors.warning};
  border-radius: 100px;
  z-index: 10;
  ${FLEX({})}
`

export const IconContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ isRight?: boolean }>`
  position: absolute;
  align-self: center;
  padding: 5px;
  ${({ isRight }) =>
    isRight
      ? css`
          right: 20px;
        `
      : css`
          left: 20px;
        `}
`
