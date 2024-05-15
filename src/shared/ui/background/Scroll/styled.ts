import { View, StyleSheet } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
})

export const ScrollContainer = styled(View)<{ pHorizontal: number }>`
  flex: 1;
  padding: 0px ${({ pHorizontal }) => pHorizontal}px;
`
