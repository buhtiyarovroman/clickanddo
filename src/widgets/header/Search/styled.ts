import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { View } from 'react-native'
import styled from 'styled-components'

export const NotificationContainer = styled(View)`
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 12px;
  background-color: ${EColors.warning};
  border-radius: 100px;
  z-index: 10;
  ${FLEX({})}
`
