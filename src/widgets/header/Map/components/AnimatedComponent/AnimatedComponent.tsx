import React, { useEffect } from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { TMapHeaderAnimatedComponent } from './types'

export const AnimatedComponent = ({
  openHashtags = false,
  currentHashtags = 0,
  searchableHashtags = 0,
  search = 0,
  children,
}: TMapHeaderAnimatedComponent) => {
  const opened = useSharedValue(0)

  useEffect(() => {
    if (openHashtags) {
      if (currentHashtags < 3 && searchableHashtags && search) {
        opened.value = withTiming(2)

        return
      }
      opened.value = withTiming(1)

      return
    }

    opened.value = withTiming(0)
  }, [currentHashtags, openHashtags, opened, search, searchableHashtags])

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      opened.value,
      [0, 1, 2],
      [0, 150, 300],
      Extrapolate.CLAMP,
    )
    const opacity = interpolate(opened.value, [0, 1], [0, 1], Extrapolate.CLAMP)

    return {
      height: height,
      opacity: opacity,
      width: '100%',
    }
  })

  return <Animated.View style={[animatedStyle]}>{children}</Animated.View>
}
