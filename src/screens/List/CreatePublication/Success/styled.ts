import { View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(View)<{ bottom: number }>`
  position: absolute;
  align-self: center;
  bottom: ${({ bottom }) => bottom + 32}px;
`
