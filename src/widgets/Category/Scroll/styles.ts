import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

import { EColors } from '@/shared/ui/Styled'

export const InterestItem = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ isSelected?: boolean; mBottom: number }>`
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 7px;
  background-color: ${({ isSelected }) =>
    isSelected ? EColors.grey_700 : EColors.grey_200};
  margin-right: 5px;
  margin-bottom: ${({ mBottom }) => mBottom}px;
`

export const Separator = styled(View)`
  width: 12px;
`

export const Filter = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  background-color: ${EColors.primary};
`

export const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: EColors.white,
  },
})

export const AbsoluteHeader = styled(View)`
  width: 100%;
  z-index: 10;
  align-self: center;
  padding-top: 16px;
`

export const MoreButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  align-items: center;
`
