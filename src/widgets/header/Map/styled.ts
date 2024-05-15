import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const Tags = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 5px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`

export const SearchingHashtagScroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})`
  height: 150px;
  overflow: hidden;
`

export const FilterContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  height: 56px;
  width: 56px;
  padding: 12px;
  background-color: ${EColors.primary};
  border-radius: 12px;
  ${FLEX({})}
`
