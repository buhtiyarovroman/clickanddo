import { TContainer, TStyledInputContainer } from './types'
import { StyleSheet, TextInput, View } from 'react-native'
import styled, { css } from 'styled-components'
import { FONT, MARGIN } from '../../utils'
import { EColors } from '../../Styled'
import { FlexWrapper } from '../../Styled/Styled'

export const Container = styled(View)<TContainer>`
  width: 100%;
  align-items: flex-start;

  ${props => MARGIN(props)}
`
//prettier-ignore
export const StyledTextInputContainer = styled(FlexWrapper).attrs({
  wrap:'wrap',
  justify:'flex-start',
  align:'flex-start'
})<TStyledInputContainer>`
  width: 100%;
  border-radius: 12px;
  background-color: ${EColors.grey_200};
  padding: 14px;
  ${({ hasError }) =>
    hasError &&
    css`
      border:1px solid ${EColors.error};
    `}
`
export const StyledTextInput = styled(TextInput)`
  width: 50%;
  height: 30px;
  padding: 0px;
  ${FONT({})}
`

export const styles = StyleSheet.create({
  padding: {
    padding: 5,
  },
  textInput: {
    fontSize: 16,
  },
})
