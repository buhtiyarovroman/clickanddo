import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { MARGIN, TMargin } from '../../utils'

export const IconContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  padding: 8px;
  border: 1px solid ${EColors.grey_400};
  border-radius: 7px;

  ${props => MARGIN(props)}
`
