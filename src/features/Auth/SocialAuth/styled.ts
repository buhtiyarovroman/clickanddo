import { EColors } from '@/shared/ui/Styled'
import { FLEX, MARGIN, TMargin } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const SocialContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  padding: 12px;
  border: 1px solid ${EColors.grey_400};
  border-radius: 7px;
  ${FLEX({})}
  ${props => MARGIN(props)}
`

export const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
    backgroundColor: EColors.secondary_D1,
  },
})
