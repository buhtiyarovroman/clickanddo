import { Dimensions, StyleSheet, TextInput, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'

export const MARKER_SIZE = 28

const { width: viewportWidth } = Dimensions.get('window')

export const Container = styled(View)<{ marginTop: number }>`
  width: 100%;
  justify-content: center;
  align-items: center;

  margin-top: ${({ marginTop }) => marginTop + 14 + 'px'};
`

export const styles = StyleSheet.create({
  markerStyle: {
    backgroundColor: EColors.primary,
    width: 20,
    height: 20,
    borderWidth: 0,
    shadowOpacity: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    top: 2,
    shadowColor: EColors.transparent,
    shadowRadius: 0,
  },
  containerStyle: {
    width: viewportWidth - 60,
  },
  trackStyle: {
    backgroundColor: EColors.primary_L3,
    height: 4,
  },
  selectedStyle: {
    backgroundColor: EColors.primary,
    height: 4,
  },
})
