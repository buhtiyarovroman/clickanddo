import { ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { TStyledDrawerContainer } from './types'
import { EColors } from '@/shared/ui/Styled'

export const DrawerContainer = styled(ScrollView).attrs({
  contentContainerStyle: {
    justifyContent: 'space-between',
  },
  showsVerticalScrollIndicator: false,
  bounces: false,
})<TStyledDrawerContainer>`
  background-color: ${EColors.white};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 24px;
  padding-top: ${({ top }) => top + 16}px;
  padding-bottom: ${({ bottom }) => bottom + 16}px;
`

export const CloseTouch = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  padding: 16px 0;
`
