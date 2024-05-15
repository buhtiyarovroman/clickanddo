import styled from 'styled-components'
import { TStyledImage } from './types'
import { MARGIN } from '../../utils'
import FastImage from 'react-native-fast-image'

export const StyledImage = styled(FastImage)<TStyledImage>`
  width: ${({ w }) => w};
  height: ${({ h }) => h};

  border-radius: ${props => props?.borderRadius ?? 0}px;
  ${props => MARGIN(props)};
`
