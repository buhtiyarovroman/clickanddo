import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components'
import { TStyledButton, TStyledText } from './types'
import { Styled } from '../../Styled'
import { MARGIN } from '../../utils'

export const StyledButton = styled(TouchableOpacity)<TStyledButton>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ radius }) => radius}px;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  ${props => MARGIN(props)}

  /* If disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      /* Add you disabled styles */
      opacity: 0.4;
    `};
`

export const StyledText = styled(Styled.LMedium)<TStyledText>`
  text-align: center;
  /* If transparent */
  ${({ color, disabled }) =>
    !disabled &&
    css`
      color: ${color};
    `}
  /* If disabled */
  ${({ disabled }) =>
    disabled &&
    css`
      /* Add you disabled styles */
    `};
`
