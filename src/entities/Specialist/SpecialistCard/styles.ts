import { StyleSheet, TouchableOpacity } from 'react-native'

import { EColors } from '@/shared/ui/Styled'
import styled from 'styled-components'
import { TStyledSpecialistCardProps } from './types'
import { MARGIN } from '@/shared/ui/utils'

export const styles = StyleSheet.create({
  wrapper: { backgroundColor: EColors.grey_200, borderRadius: 12 },
  iconWrapper: { position: 'absolute', top: 8, right: 15 },
})

export const SpecialistCardContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TStyledSpecialistCardProps>`
  justify-content: flex-start;
  background-color: ${EColors.grey_200};
  border-radius: 12px;
  width: ${({ width }) => width};
  flex-direction: row;
  padding: 12px;

  ${props => MARGIN(props)}
`
