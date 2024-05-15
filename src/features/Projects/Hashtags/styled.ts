import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const HashtagContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 8px 12px;
  border-radius: 24px;
  background-color: ${EColors.grey_200};
  margin: 0px 8px 8px 0px;
`
