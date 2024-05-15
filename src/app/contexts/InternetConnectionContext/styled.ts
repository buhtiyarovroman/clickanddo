import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(View)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: ${EColors.white};
  ${FLEX({ direction: 'column' })};
  padding: 0px 20px;
`
