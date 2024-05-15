import React, { forwardRef } from 'react'
import { StyleSheet } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { TSwipeChatProps } from './types'
import { EColors } from '../Styled'

export const SwipeChat = forwardRef<Swipeable, TSwipeChatProps>(
  ({ children, renderLeftActions = () => <></> }, ref) => {
    return (
      <Swipeable
        ref={ref}
        overshootRight
        renderRightActions={renderLeftActions}
        containerStyle={[styles.swipeable]}>
        {children}
      </Swipeable>
    )
  },
)

const styles = StyleSheet.create({
  swipeable: {
    width: '100%',
    backgroundColor: EColors.error_L2,
    overflow: 'visible',
    borderRadius: 12,
  },
})
