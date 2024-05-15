import { Touchable } from '@/shared/ui/Styled/Styled'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import styled from 'styled-components'
import { View } from 'react-native'
import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'

export const Container = styled(BottomSheetView)`
  width: 100%;
  flex: 1;
  padding-bottom: ${({ theme: { instBottom } }) => instBottom + 16}px;
`

export const Absolute = styled(Touchable).attrs({
  width: 'auto',
})`
  position: absolute;
  left: 20px;
`

export const ContentContainer = styled(BottomSheetView)`
  padding: 0px 20px;
  width: 100%;
  flex: 1;
`

export const BContainer = styled(View)`
  width: 100%;
  padding: 8px 8px 0px 8px;
  background-color: ${EColors.white};
  ${FLEX({ direction: 'row', align: 'center', justify: 'space-between' })}
`
