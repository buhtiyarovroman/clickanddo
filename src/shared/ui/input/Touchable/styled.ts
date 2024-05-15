import { TouchableOpacity } from 'react-native-gesture-handler'
import { TContainer, TStyledInput, TStyledInputContainer } from './types'
import { StyleSheet, TextInput, View } from 'react-native'
import styled, { css } from 'styled-components'
import { FONT, MARGIN } from '../../utils'
import { EColors } from '../../Styled'

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
  height: auto;
  padding: 0;
  ${FONT({})}
`

export const InputContainer = styled(View)<{ isFocused: boolean }>`
  flex: 1;
  ${({ isFocused }) =>
    isFocused &&
    css`
      height: 100%;
    `}
`

export const styles = StyleSheet.create({
  padding: {
    padding: 5,
  },
  textInput: {
    fontSize: 16,
  },
})
