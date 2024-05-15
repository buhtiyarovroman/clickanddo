import { ScrollView, View } from 'react-native'
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
