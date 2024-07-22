import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { FLEX } from '@/shared/ui/utils'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const SkillsContainer = styled(FlexWrapper).attrs({
  align: 'flex-start',
  justify: 'flex-start',
  wrap: 'wrap',
})`
  background-color: ${EColors.grey_200};
  padding: 12px;
  border-radius: 12px;
`

export const SkillItem = styled(TouchableOpacity).attrs({ activeOpacity: 1 })<{
  background?: EColors
}>`
  margin-right: 5px;
  background-color: ${({ background }) => background || EColors.primary};
  padding: 8px;
  border-radius: 24px;
  margin-bottom: 5px;

  ${FLEX({})}
`
