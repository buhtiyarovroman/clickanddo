import { EColors } from '@/shared/ui/Styled'
import { View } from 'react-native'
import styled from 'styled-components'

export const Dot = styled(View)<{ active: boolean }>`
  width: ${({ active }) => (active ? 16 : 8)}px;
  height: 8px;
  border-radius: 8px;
  margin: 0px 7px;
  background-color: ${({ active }) =>
    active ? EColors.primary : EColors.primary_L2};
`
