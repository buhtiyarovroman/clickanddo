import { TContainer } from './types'
import { View } from 'react-native'
import styled from 'styled-components'
import { MARGIN } from '../../utils'

export const Container = styled(View)<TContainer>`
  width: ${({ width }) => width};

  ${props => MARGIN(props)}
`
