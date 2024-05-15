import styled from 'styled-components'
import { ActivityIndicator } from 'react-native'
import { MARGIN, TMargin } from '../../utils'

export const Indicator = styled(ActivityIndicator)<TMargin>`
  ${props => MARGIN(props)}
`
