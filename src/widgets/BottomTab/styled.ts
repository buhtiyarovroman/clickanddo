import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  shadow: {
    width: '100%',
  },
})

export const Container = styled(Animated.View)`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  flex-direction: row;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding-top: 16px;
  background-color: ${EColors.grey_100};
`

export const StyledTabButton = styled(TouchableOpacity)`
  flex: 1;
`
