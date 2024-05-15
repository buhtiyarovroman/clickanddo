import { TouchableOpacity } from 'react-native-gesture-handler'
import { TContainer, TStyledInput, TStyledInputContainer } from './types'
import { TextInput, View } from 'react-native'
import styled, { css } from 'styled-components'
import { FONT, MARGIN } from '../../utils'
import { EColors } from '../../Styled'

export const Container = styled(View)<TContainer>`
  width: ${({ width }) => width};
  align-items: flex-start;

  ${props => MARGIN(props)}
  padding: 0px 20px;
`
//prettier-ignore
export const StyledTextInputContainer = styled(TouchableOpacity)<TStyledInputContainer>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${({ height }) => height};

   
  border-radius: 10px;
  background-color: ${EColors.white};

  ${FONT({})}

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${EColors.error};
    `}

`
export const StyledTextInput = styled(TextInput)<TStyledInput>`
  margin-left: ${({ hasLeftIcon }) => (hasLeftIcon ? '11px' : '0px')};
  margin-right: ${({ hasRightIcon }) => (hasRightIcon ? '11px' : '0px')};

  ${FONT({})}
`

export const InputContainer = styled(View)`
  flex: 1;
`
