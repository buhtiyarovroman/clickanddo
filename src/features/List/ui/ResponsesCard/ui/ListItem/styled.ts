import { EColors } from '@/shared/ui/Styled'
import { View } from 'react-native'
import styled from 'styled-components'

export const Dot = styled(View)`
  width: 12px;
  height: 12px;
  background-color: ${EColors.primary};
  border-radius: 100px;
`
