import { Image } from '@/shared/ui/image'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components'

export const IconContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ isRight?: boolean }>`
  position: absolute;
  align-self: center;
  padding: 5px;
  ${({ isRight }) =>
    isRight
      ? css`
          right: 0px;
        `
      : css`
          left: 0px;
        `}
`

export const TouchableUser = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  ${FLEX({})}
`

export const ImageUser = styled(Image.Standard).attrs({
  type: 'user',
  mLeft: '15px',
})`
  width: 36px;
  height: 36px;
  border-radius: 100px;
`
