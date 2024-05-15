import styled from 'styled-components'
import { SRegular } from '../Styled/Styled'
import { EColors } from '../Styled'
import { TouchableOpacity } from 'react-native'
import { FLEX } from '../utils'

export const SkillText = styled(SRegular).attrs({
  mRight: '5px',
})<{ isActive?: boolean }>`
  color: ${({ isActive }) => (isActive ? EColors.white : EColors.black)};
`

export const SkillItem = styled(TouchableOpacity).attrs({ activeOpacity: 1 })<{
  isActive?: boolean
}>`
  margin-right: 5px;
  background-color: ${({ isActive }) =>
    isActive ? EColors.primary : EColors.grey_200};
  padding: 8px;
  border-radius: 24px;
  margin-bottom: 12px;

  ${FLEX({})}
`
