import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity, View, StyleSheet } from 'react-native'
import styled from 'styled-components'

export const HashtagContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 8px 12px;
  border-radius: 24px;
  background-color: ${EColors.grey_200};
  margin: 0px 8px 8px 0px;
`

export const ListContainer = styled(View)`
  height: 150px;
  width: 100%;
`

export const styles = StyleSheet.create({
  list: { flexWrap: 'wrap', flexDirection: 'row' },
})
