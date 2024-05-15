import { StyleSheet, View } from 'react-native'
import { EColors } from '../../Styled'
import { EFonts } from '../../utils'
import styled from 'styled-components'

export const Container = styled(View)`
  z-index: 2;
`

export const styles = StyleSheet.create({
  containerStyle: {
    // backgroundColor: 'red',
    // height: 60,
    // flex: 1,
    // opacity: 1,
  },
  style: {
    // flex: 1,
    borderColor: EColors.primary,
    // height: 20,
    borderWidth: 1,
    backgroundColor: EColors.white,
    // opacity: 0.4,
    // height: 20,
    // padding: 100,
  },
  listItemContainerStyle: {
    // height: 40,
  },
  listItemLabelStyle: {
    fontSize: 14,
    color: EColors.black,
    fontFamily: EFonts.gilroy,
  },
  selectedItemLabelStyle: {
    fontWeight: 'bold',
  },
  customItemContainerStyle: {
    // backgroundColor: 'blue',
  },
  customItemLabelStyle: {
    // fontStyle: 'italic',
  },
  dropDownContainerStyle: {
    borderColor: EColors.primary,
    borderWidth: 1,
    backgroundColor: EColors.white,
  },
  // Arrow
  arrowIconStyle: {
    // color: 'red',
    // backgroundColor: 'red',
  },
  arrowIconContainerStyle: {
    // color: 'red',
    // backgroundColor: 'red',
    // height: 100,
    // color: 'red',
  },
})
