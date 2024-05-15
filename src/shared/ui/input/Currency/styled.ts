import { TextInput, TouchableOpacity, View } from 'react-native'
import styled, { css } from 'styled-components'

import { EColors } from '@/shared/ui/Styled'
import { FLEX, MARGIN, TMargin } from '@/shared/ui/utils'

export const CInput = styled(View)<
  {
    hasError: boolean
  } & TMargin
>`
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

  ${props => MARGIN(props)}
`

export const Input = styled(TextInput)<{
  fontSize?: number
}>`
  width: 80%;
  height: 100%;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 14)}px;
  color: ${EColors.black};
`

export const BCurrency = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 15%;
  height: 100%;
  background-color: ${EColors.white};
  border-radius: 12px;
  ${FLEX({})}
`
