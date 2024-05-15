import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { MARGIN, TMargin } from '../../utils'

export const StyledRadio = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})<{ checked: boolean } & TMargin>`
  height: 24px;
  width: 24px;
  border-radius: 20px;
  border-width: 1px;
  padding: 2px;

  border-color: ${({ checked }) =>
    checked ? EColors.primary : EColors.grey_500};

  ${props => MARGIN(props)}
`

export const Checked = styled(View)`
  flex: 1;
  background-color: ${EColors.primary};
  border-radius: 100px;
`
