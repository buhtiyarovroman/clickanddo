import { TContainer } from './types'
import { TouchableOpacity, View } from 'react-native'
import styled, { css } from 'styled-components'
import { FLEX, MARGIN, TMargin } from '../../utils'

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

export const RadioContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  ${props => MARGIN(props)}
  ${FLEX({})}
`
