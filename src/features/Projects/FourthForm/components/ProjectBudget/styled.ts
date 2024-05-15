import styled, { css } from 'styled-components'
import { TextInput, TouchableOpacity, View } from 'react-native'
import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'

export const StyledTextInputContainer = styled(View)<{
  hasError: boolean
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 54px;

  border-radius: 12px;
  background-color: ${EColors.grey_200};

  padding: 5px 12px;

  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid ${EColors.error};
    `}
`

export const StyledTextInput = styled(TextInput).attrs({})`
  width: 80%;
  height: 100%;
`

export const CurrencyButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 15%;
  height: 100%;
  background-color: ${EColors.white};
  border-radius: 12px;
  ${FLEX({})}
`
