import { EColors } from '@/shared/ui/Styled'
import { MARGIN, TMargin } from '@/shared/ui/utils'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  border-radius: 20px;
  padding: 20px;
  background-color: ${EColors.grey_200};

  ${props => MARGIN(props)}
`

export const styles = StyleSheet.create({
  buttons: {
    padding: 0,
  },
})
