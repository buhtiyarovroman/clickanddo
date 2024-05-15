import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { TStyledSelectItemProps } from './types'

export const styles = StyleSheet.create({
  shadow: {
    shadowColor: EColors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  popover: {
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingTop: 4,
    paddingBottom: 2,
    backgroundColor: EColors.white,
  },
  background: {
    backgroundColor: EColors.transparent,
  },
})

export const Container = styled(TouchableOpacity)`
  padding: 5px;
`

export const ItemsContainer = styled(View)`
  align-items: flex-start;
`

export const ItemContainer = styled(TouchableOpacity)<TStyledSelectItemProps>`
  align-items: flex-start;
  justify-content: ${({ reverseItem }) =>
    reverseItem ? 'flex-end' : 'flex-start'};
  flex-direction: ${({ reverseItem }) => (reverseItem ? 'row-reverse' : 'row')};
  padding: 5px 10px;
  background-color: ${EColors.white};
  border-radius: 8px;
  width: 100%;
  margin-bottom: 2px;
`
