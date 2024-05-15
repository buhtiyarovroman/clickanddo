import { EColors } from '@/shared/ui/Styled'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { StyleSheet, View } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import styled from 'styled-components'

export const Container = styled(BottomSheetView)`
  padding: 20px;
  width: 100%;
  padding-bottom: ${({ theme: { instBottom } }) => instBottom + 16}px;
`
