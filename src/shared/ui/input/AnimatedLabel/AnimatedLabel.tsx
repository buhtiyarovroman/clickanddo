import React, { useEffect } from 'react'
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { TAnimatedLabel } from './types'
import { styles } from './styled'

export const AnimatedLabel = ({
  label,
  isFocused,
  hasValue,
  height,
  iconSize,
}: TAnimatedLabel) => {
  const position = useSharedValue(0)
  const size = useSharedValue(0)

  useEffect(() => {
    position.value = withTiming(isFocused || hasValue ? 1 : 0, {
      duration: 200,
    })
    size.value = withTiming(isFocused || hasValue ? 1 : 0, {
      duration: 200,
    })
  }, [isFocused, hasValue])

  const middlePosition = parseInt(height.replace('px', '')) / 2 - 10

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      position.value,
      [0, 1],
      [0, -middlePosition],
      Extrapolate.CLAMP,
    )

    const aminSize = interpolate(
      size.value,
      [0, 1],
      [16, 12],
      Extrapolate.CLAMP,
    )

    return {
      transform: [{ translateY }],
      fontSize: aminSize,
    }
  })

  return (
    <Animated.Text
      style={[
        animatedStyle,
        styles.animText,
        {
          bottom: middlePosition,
          left: iconSize || 12,
        },
      ]}>
      {label}
    </Animated.Text>
  )
}
