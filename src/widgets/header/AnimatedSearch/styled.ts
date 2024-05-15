import { StyleSheet, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'

export const Wrapper = styled(View)`
  z-index: 5;
  bottom: ${TAB_HEIGHT * 1.45}px;
  align-self: center;
  position: absolute;
`

export const styles = StyleSheet.create({
  main: {
    paddingTop: 24,
  },
})

export const Tags = styled(View)`
  flex: 1;
  width: 100%;
  margin-top: 5px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
`

export const FilterContainer = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  height: 50px;
  width: 50px;
  padding: 12px;
  background-color: ${EColors.primary};
  border-radius: 12px;
  ${FLEX({})}
`
