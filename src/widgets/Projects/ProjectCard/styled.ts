import { EColors } from '@/shared/ui/Styled'
import { MARGIN, TMargin } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const ProjectContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin & { width?: string }>`
  width: ${({ width }) => width};
  padding: 20px;
  background-color: ${EColors.grey_200};
  border-radius: 12px;
  ${props => MARGIN(props)}
`
