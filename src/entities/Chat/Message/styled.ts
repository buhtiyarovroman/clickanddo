import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(View)<{
  isMy: boolean
  isSystemMessage: boolean
}>`
  width: 100%;
  margin-bottom: 12px;
  ${({ isMy, isSystemMessage }) =>
    FLEX({
      direction: 'column',
      align: isSystemMessage ? 'center' : isMy ? 'flex-end' : 'flex-start',
    })}
`

export const MessageContainer = styled(View)<{
  isMy: boolean
}>`
  max-width: 80%;
  ${({ isMy }) =>
    FLEX({
      align: 'flex-end',
      direction: isMy ? 'row' : 'row-reverse',
    })}
`

export const MessageTextContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})<{ isMy: boolean }>`
  width: auto;

  padding: 12px;
  background-color: ${({ isMy }) => (isMy ? EColors.primary : EColors.white)};
  border-radius: 8px;
`
