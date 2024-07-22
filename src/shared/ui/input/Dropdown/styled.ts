import { StyleSheet, View } from 'react-native'
import { EColors } from '../../Styled'
import { EFonts } from '../../utils'
import styled from 'styled-components'

export const Container = styled(View)`
  z-index: 2;
`

export const styles = StyleSheet.create({
  containerStyle: {},
  style: {
    borderColor: EColors.primary,
    borderWidth: 1,
    backgroundColor: EColors.white,
  },
  listItemContainerStyle: {},
  listItemLabelStyle: {
    fontSize: 14,
    color: EColors.black,
    fontFamily: EFonts.gilroy,
  },
  selectedItemLabelStyle: {
    fontWeight: 'bold',
  },
  customItemContainerStyle: {},
  customItemLabelStyle: {},
  dropDownContainerStyle: {
    borderColor: EColors.primary,
    borderWidth: 1,
    backgroundColor: EColors.white,
  },
  // Arrow
  arrowIconStyle: {},
  arrowIconContainerStyle: {},
})
