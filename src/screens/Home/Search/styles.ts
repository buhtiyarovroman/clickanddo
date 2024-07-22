import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '@/shared/ui/Styled'
import Animated from 'react-native-reanimated'

export const Tags = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 5px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`

export const FoundedTags = styled(View)`
  max-height: 350px;
  width: 100%;
`

export const Tag = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<{ isSelected?: boolean }>`
  margin: 5px;
  padding: 8px 12px;
  border-radius: 24px;
  background-color: ${({ isSelected }) =>
    isSelected ? EColors.primary : EColors.grey_200};
`

export const ListContainer = styled(Animated.View)`
  padding: 0px 20px;
`

export const styles = StyleSheet.create({
  main: {
    paddingTop: 100,
    backgroundColor: EColors.grey_300,
  },
  projectsList: {
    marginTop: 15,
  },
  separator: {
    height: 10,
  },
  list: { flexWrap: 'wrap', flexDirection: 'row' },
})
