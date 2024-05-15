import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { View } from 'react-native'
import styled from 'styled-components'

export const StatusContainer = styled(View)<{ backgroundColor: EColors }>`
  padding: 3px 10px;
  border-radius: 14px;
  width: auto;
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${FLEX({})}
`
