import { View } from 'react-native'
import styled from 'styled-components'

export const HeaderContainer = styled(View)<{ height: number }>`
  height: ${({ height }) => height}px;
  padding-top:${({ theme: { instTop } }) => instTop}px
  justify-content: center;
`

export const BarHeight = styled(View).attrs({
  pointerEvents: 'none',
})<{ height: number }>`
  height: ${({ height }) => height}px;
`
