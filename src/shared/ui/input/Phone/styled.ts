import { TouchableOpacity } from 'react-native-gesture-handler'
import { TContainer, TStyledInput, TStyledInputContainer } from './types'
import { Platform, StyleSheet, TextInput, View } from 'react-native'
import styled, { css } from 'styled-components'
import { FLEX, FONT, MARGIN } from '../../utils'
import { EColors } from '../../Styled'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const Container = styled(View)<TContainer>`
  width: ${({ width }) => width};
  align-items: flex-start;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.7;
    `}
  ${props => MARGIN(props)}
`
//prettier-ignore
export const StyledTextInputContainer = styled(TouchableOpacity)<TStyledInputContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height};

   
  border-radius: 12px;
  background-color: ${EColors.grey_200};

  ${FONT({})}
  padding:0px 12px;


  ${({ hasError }) =>
    hasError &&
    css`
      border:1px solid ${EColors.error};
    `}


`
export const StyledTextInput = styled(TextInput)<TStyledInput>`
  margin-left: ${({ hasLeftIcon }) => (hasLeftIcon ? '8px' : '0px')};
  margin-right: ${({ hasRightIcon }) => (hasRightIcon ? '11px' : '0px')};
  ${FONT({})}
`

export const InputContainer = styled(View)`
  flex: 1;
`

export const styles = StyleSheet.create({
  padding: {
    padding: 5,
  },
  textInputPhone: {
    fontSize: 16,
  },
})

export const pickerStyles = StyleSheet.create({
  // global view
  modal: {
    flex: 1,
    backgroundColor: EColors.white,
    marginTop: Platform.OS === 'ios' ? 100 : 60,
  },
  // search input
  textInput: {
    color: EColors.black,
    paddingHorizontal: 10,
    marginTop: 20,
    backgroundColor: EColors.grey_200,
    height: 48,
  },
  // search if not found
  searchMessageText: {
    color: EColors.black,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  // container if not found
  countryMessageContainer: {
    flex: 1,
  },
  // line
  line: {
    backgroundColor: EColors.error,
    height: 0,
  },
  // item
  countryButtonStyles: {
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: EColors.white,
  },
  // country flag (item)
  flag: {
    maxWidth: wp(10),
    fontSize: 24,
  },
  // country code (item)
  dialCode: {
    maxWidth: wp(15),
    color: EColors.black,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  // country name (item)
  countryName: {
    color: EColors.black,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    flexWrap: 'wrap',
    flexGrow: 1,
    textAlign: 'left',
  },
})

export const CodeView = styled(TouchableOpacity)`
  padding: 8px 12px;
  background-color: ${EColors.white};
  border-radius: 7px;
  margin-right: 10px;
  ${FLEX({})};
`
