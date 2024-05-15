import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    zIndex: 100,
  },
  horizontal: {
    paddingHorizontal: 20,
  },
})

export const LocationButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  padding: 5px;
  background-color: ${EColors.white};
  border-radius: 100px;
  ${FLEX({})};
`
