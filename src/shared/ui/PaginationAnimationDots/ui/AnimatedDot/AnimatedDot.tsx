import React from 'react'
import { TAnimatedDotProps } from './types'
import {
  Extrapolation,
  FadeIn,
  FadeOut,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'
import { Dot } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { Dimensions } from 'react-native'

const { width: viewportWidth } = Dimensions.get('window')

const DOT_WIDTH = 8

export const AnimatedDot = ({
  dotMargin = 7,
  currentIndex = 0,
  x,
}: TAnimatedDotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(
        x.value,
        [
          (currentIndex - 1) * viewportWidth,
          currentIndex * viewportWidth,
          (currentIndex + 1) * viewportWidth,
        ],
        [DOT_WIDTH, DOT_WIDTH * 2, DOT_WIDTH],
        Extrapolation.CLAMP,
      ),
      backgroundColor: interpolateColor(
        x.value,
        [
          (currentIndex - 1) * viewportWidth,
          currentIndex * viewportWidth,
          (currentIndex + 1) * viewportWidth,
        ],
        [EColors.primary_L2, EColors.primary, EColors.primary_L2],
      ),
    }
  })

  return (
    <Dot
      entering={ZoomIn}
      exiting={ZoomOut}
      style={animatedStyle}
      dotMargin={dotMargin}
    />
  )
}
