import { StyleSheet } from 'react-native'

import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styled from 'styled-components'

import { EColors } from '../../Styled'

export const styles = StyleSheet.create({
  // TODO
  background: { backgroundColor: EColors.white },
  indicator: { backgroundColor: EColors.grey_300, width: 68, height: 6 },
  contentContainer: { paddingBottom: 100 },
})

export const Scroll = styled(BottomSheetScrollView).attrs({
  contentContainerStyle: {},
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  max-height: ${hp(90)}px;
`

export const Container = styled(BottomSheetView)`
  flex: 1;
`
