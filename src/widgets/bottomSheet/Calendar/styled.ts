import { BottomSheetView } from '@gorhom/bottom-sheet'
import styled from 'styled-components'

export const Container = styled(BottomSheetView)`
  padding: 12px 16px;
  width: 100%;
  padding-bottom: ${({ theme: { instBottom } }) => instBottom + 16}px;
`
