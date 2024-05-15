import { TouchableOpacity } from 'react-native-gesture-handler'
import styled, { css } from 'styled-components'
import { EColors } from '../../Styled'
import { TContainer, TStyledInputContainer } from './types'
import { StyleSheet, View } from 'react-native'
import { FONT, MARGIN } from '../../utils'

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

export const StyledTextInputContainer = styled(
  TouchableOpacity,
)<TStyledInputContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height};

  border-radius: 12px;
  background-color: ${EColors.grey_200};

  ${FONT({})}
  padding: 0px 12px;

  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid ${EColors.error};
    `}
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
  left_icon: {
    marginRight: 10,
  },
})
