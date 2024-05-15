import { EColors } from '@/shared/ui/Styled'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'

export const BottomContainer = styled(View)`
  position: absolute;
  width: 100%;
  padding: 0 20px 16px 20px;
  bottom: 0;
  background-color: ${EColors.white};
`

export const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
  },
})
