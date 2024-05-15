import { Touchable } from '@/shared/ui/Styled/Styled'
import styled from 'styled-components'
import { View } from 'react-native'
import { EColors } from '@/shared/ui/Styled'

export const Container = styled(Touchable).attrs({
  justify: 'space-between',
})`
  padding: 11px 0px;
`

export const Checked = styled(View)`
  width: 24px;
  height: 24px;
  background-color: ${EColors.black};
  border-radius: 100px;
`
