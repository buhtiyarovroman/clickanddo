import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const Container = styled(FlexWrapper)`
  padding: 12px 16px;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`

export const CurrencyContainer = styled(TouchableOpacity)`
  width: 100%;
  padding: 10px 0px;
  ${FLEX({ justify: 'space-between' })}
`

export const styles = StyleSheet.create({
  datePicker: {
    width: Dimensions.get('screen').width,
    marginTop: 20,
  },
})
