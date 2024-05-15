import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const BackContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.6,
})`
  padding: 15px;
  background-color: ${EColors.primary};
  border-radius: 100px;
`
