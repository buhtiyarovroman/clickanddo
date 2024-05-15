import Animated from 'react-native-reanimated'
import styled from 'styled-components'

export const Dot = styled(Animated.View)<{ dotMargin: number }>`
  height: 8px;
  border-radius: 8px;
  margin: 0px ${({ dotMargin }) => `${dotMargin}px`};
`
