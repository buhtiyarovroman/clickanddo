import { EColors } from '@/shared/ui/Styled'
import { View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(View)`
  background-color: ${EColors.white};
  flex: 1;
  z-index: -1;
  overflow: hidden;
`
