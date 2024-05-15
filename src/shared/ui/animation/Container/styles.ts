import { View, TouchableOpacity, StyleSheet } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'

export const Header = styled(View)<{ hasInstTop?: boolean }>`
  padding-top: ${({ hasInstTop }) => (hasInstTop ? 16 : 0)}px;
  padding-bottom: 10px;
  padding-right: 20px;
  padding-left: 20px;
  position: absolute;
  top: ${({ hasInstTop, theme: { instTop } }) => (hasInstTop ? instTop : 0)}px;
  align-self: center;
  z-index: 10;
  background-color: ${EColors.white};
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`

export const MoreButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  align-items: center;
`

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: EColors.white,
  },
})
