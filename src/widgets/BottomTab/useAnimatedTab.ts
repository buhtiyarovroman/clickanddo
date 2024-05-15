import { useEffect, useState } from 'react'
import {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export const TAB_HEIGHT = wp(15)
const HEIGHT_2 = wp(8)

export const useAnimatedTab = () => {
  const { bottom } = useSafeAreaInsets()
  const [visible, setVisible] = useState(false)
  const TAB_HEIGHT_LOCAL = bottom ? TAB_HEIGHT * 0.67 + bottom : TAB_HEIGHT

  const x = useSharedValue(visible ? TAB_HEIGHT_LOCAL : -HEIGHT_2)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: x.value,
        },
      ],
      height: visible ? TAB_HEIGHT_LOCAL : 0,
    }
  })

  useEffect(() => {
    if (visible) {
      x.value = withTiming(-HEIGHT_2 * 0.01)
      return
    }
    if (!visible) {
      x.value = withTiming(TAB_HEIGHT)

      return
    }
  }, [visible, x])

  return { animatedStyle, setVisible, visible }
}
