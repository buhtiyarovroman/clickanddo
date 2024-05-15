import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { StyleSheet, Dimensions } from 'react-native'
import styled from 'styled-components'

export const Container = styled(FlexWrapper)`
  padding: 12px 16px;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`

export const styles = StyleSheet.create({
  datePicker: {
    width: Dimensions.get('screen').width,
    marginTop: 20,
  },
})
