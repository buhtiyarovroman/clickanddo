import { EColors } from '@/shared/ui/Styled'
import { FLEX, TMargin } from '@/shared/ui/utils'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'

export const VariantContainer = styled(View).attrs({
  activeOpacity: 0.8,
})<TMargin>`
  height: 54px;
  width: 100%;
  padding: 4px;
  border-radius: 12px;
  background-color: ${EColors.primary_L3};
  ${FLEX({ justify: 'space-between' })}
  margin-bottom:20px;
`

export const VariantItem = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  height: 100%;
  width: 49%;
  border-radius: 8px;
  ${FLEX({})}
`

export const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
  },
})
