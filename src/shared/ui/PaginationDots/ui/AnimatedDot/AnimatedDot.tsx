import React, { useEffect } from 'react'
import { TAnimatedDotProps } from './types'
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Dot } from './styled'
import { EColors } from '@/shared/ui/Styled'

export const AnimatedDot = ({
  active = false,
  dotMargin = 7,
}: TAnimatedDotProps) => {
  const width = useSharedValue(8)
  const color = useSharedValue(0)

  useEffect(() => {
    if (active) {
      width.value = withTiming(16)
      color.value = withTiming(1)
      return
    }

    width.value = withTiming(8)
    color.value = withTiming(0)
  }, [active, color, width])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      backgroundColor: interpolateColor(
        color.value,
        [0, 1],
        [EColors.primary_L2, EColors.primary],
      ),
    }
  })

  return <Dot style={animatedStyle} dotMargin={dotMargin} />
}
