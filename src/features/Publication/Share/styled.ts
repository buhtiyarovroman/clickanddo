import { EColors } from '@/shared/ui/Styled'
import { FLEX, MARGIN, TMargin } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const Touchable = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  padding: 10px;
  border-radius: 100px;
  background-color: ${EColors.grey_200};
  ${FLEX({})}
  ${props => MARGIN(props)}
`
