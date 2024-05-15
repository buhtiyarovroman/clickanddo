import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const Container = styled(FlexWrapper)`
  padding: 12px 16px;
  flex-direction: column;
`

export const styles = StyleSheet.create({
  main: {
    marginBottom: 24,
  },
  column: {
    justifyContent: 'space-between',
  },
  styleColumn: {
    width: '100%',
  },
})
