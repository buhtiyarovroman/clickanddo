import { EColors } from '@/shared/ui/Styled'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(BottomSheetView)`
  padding: 20px;
  width: 100%;
  align-items: center;
  padding-bottom: ${({ theme: { instBottom } }) => instBottom + 16}px;
`

export const styles = StyleSheet.create({
  transparent_button: {
    borderWidth: 1,
    borderColor: EColors.grey_600,
  },
})
