import { EColors } from '@/shared/ui/Styled'
import { ScrollView, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const SearchContainer = styled(ScrollView).attrs({
  nestedScrollEnabled: true,
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },
})`
  padding: 12px;
  height: 200px;
  max-height: 200px;
  width: 100%;
`

export const SkillItem = styled(TouchableOpacity).attrs({})`
  margin-right: 5px;
  margin-bottom: 12px;

  border: 1px solid ${EColors.black};
  padding: 8px;
  border-radius: 24px;
`
