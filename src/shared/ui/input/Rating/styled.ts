import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { FlexWrapper } from '../../Styled/Styled'
import { MARGIN, TMargin } from '../../utils'

export const StyledContainer = styled(FlexWrapper).attrs({
  justify: 'space-around',
  width: 'auto',
})``

export const StyledStarContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  padding: 4px;
  border-radius: 5px;
  background-color: ${EColors.grey_200};
  ${props => MARGIN(props)}
`
