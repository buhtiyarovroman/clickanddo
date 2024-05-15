import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { FLEX } from '../../utils'

export const styles = StyleSheet.create({
  popover: {
    paddingHorizontal: 10,
    borderRadius: 12,
    width: '90%',
    paddingBottom: 30,
  },
})

export const PopoverItem = styled(TouchableOpacity)`
  ${FLEX({ justify: 'flex-start' })}
  padding: 8px 0;
`
