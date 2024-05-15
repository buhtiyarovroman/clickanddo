import { TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../shared/ui/Styled'

export const MoreButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  align-items: center;
`

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: EColors.white,
  },
})
