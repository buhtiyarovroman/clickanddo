import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { FLEX } from '../../utils'

export const styles = StyleSheet.create({
  popover: {
    paddingHorizontal: 10,
    borderRadius: 12,
  },
})

export const PopoverItem = styled(TouchableOpacity)`
  ${FLEX({ justify: 'space-between' })}
  padding: 8px 0;
`
