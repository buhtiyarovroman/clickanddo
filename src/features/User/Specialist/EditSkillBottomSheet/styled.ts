import { EColors } from '@/shared/ui/Styled'
import { ScrollView, StyleSheet } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  main: {
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    borderColor: EColors.black,
    borderWidth: 1,
  },
})

export const ScrollConyainer = styled(ScrollView).attrs({
  showsVerticalScrollIndicator: false,
})``
