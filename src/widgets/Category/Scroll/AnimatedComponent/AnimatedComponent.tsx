import { hp } from '@/shared/ui/utils'
import React, { useEffect } from 'react'
import Animated, {
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { TAnimatedComponentProps } from './types'

export const AnimatedComponent = ({
  isOpen = false,
  dataLength = 0,
  singleHeight = 0,
  globalHeight = 0,
  children,
}: TAnimatedComponentProps) => {
  const opened = useSharedValue(0)

  const closedHeight = !!dataLength ? singleHeight * 2 : singleHeight
  const openedHeight = hp(70)

  useEffect(() => {
    if (isOpen) {
      if (dataLength < 5) {
        opened.value = withTiming(2)
        return
      }
      opened.value = withTiming(1)

      return
    }

    opened.value = withTiming(0)
  }, [dataLength, isOpen, opened])

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      opened.value,
      [0, 1],
      [closedHeight, openedHeight],
      Extrapolation.CLAMP,
    )

    return { height, width: '100%' }
  })

  return (
    <Animated.View style={[animatedStyle]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        // scrollEnabled={isOpen ?? true}
      >
        {children}
      </Animated.ScrollView>
    </Animated.View>
  )
}
