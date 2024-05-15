import { Touchable } from '@/shared/ui/Styled/Styled'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import styled from 'styled-components'
import { View } from 'react-native'

export const Container = styled(BottomSheetView)`
  width: 100%;
  padding-bottom: ${({ theme: { instBottom } }) => instBottom + 16}px;
`

export const Absolute = styled(Touchable).attrs({
  width: 'auto',
})`
  position: absolute;
  left: 20px;
`

export const ContentContainer = styled(View)`
  padding: 0px 20px;
`
