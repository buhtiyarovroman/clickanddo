import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'

export const BackgroundSafeArea = styled(SafeAreaView)<{ color: string }>`
  background-color: ${({ color }) => color};

  flex: 1;
`
