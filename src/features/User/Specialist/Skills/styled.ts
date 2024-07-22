import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const SkillContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 1,
})<{ color?: EColors }>`
  background-color: ${({ color }) => color || EColors.primary_L2};
  padding: 6px 8px;
  border-radius: 24px;
  margin: 0 5px 5px 0;
`
