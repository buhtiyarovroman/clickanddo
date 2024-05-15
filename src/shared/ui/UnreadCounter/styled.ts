import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { TStyledUnreadCounterProps } from './types'

export const UnreadContainer = styled(View)<TStyledUnreadCounterProps>`
  position: absolute;

  bottom: 0;

  right: 0;
  width: 20px;
  height: 20px;
  background-color: ${EColors.error};
  border-radius: 100px;
  z-index: 1000;
  border: 1px solid ${EColors.white} ${FLEX({})};
`

export const UnreadText = styled(Text)`
  color: ${EColors.white};
  font-size: 12px;
  line-height: 13px;
`
