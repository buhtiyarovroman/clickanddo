import styled from 'styled-components'
import { View } from 'react-native'

export const Background = styled(View)<{ color: string }>`
  background-color: ${({ color }) => color};

  flex: 1;
`
