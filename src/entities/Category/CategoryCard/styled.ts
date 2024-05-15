import { EColors } from '@/shared/ui/Styled'
import { FLEX, MARGIN } from '@/shared/ui/utils'
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { TStyledCategoryCardProps } from './types'

export const CategoryContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})<TStyledCategoryCardProps>`
  width: ${({ width }) => width};
  background-color: ${EColors.grey_200};
  border-radius: 12px;
  height: 76px;
  overflow: hidden;

  ${prop => MARGIN(prop)}
  ${FLEX({ justify: 'space-between' })}
`

export const ImageContainer = styled(ImageBackground)`
  width: 100%;

  height: 100%;
`

export const styles = StyleSheet.create({
  button: { paddingLeft: 12 },
})
