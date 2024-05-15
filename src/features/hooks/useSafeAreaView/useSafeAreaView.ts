import { SafeAreaContext } from '@/app/contexts'
import { EColors } from '@/shared/ui/Styled'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import { useContext, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type TUseSafeAreaView = {
  color?: EColors
}

export const useSafeAreaView = ({
  color = EColors.white,
}: TUseSafeAreaView) => {
  const { setBackgroundColor, ...props } = useContext(SafeAreaContext)
  const insects = useSafeAreaInsets()
  const isFocus = useIsFocused()

  useEffect(() => {
    if (isFocus && color) {
      setBackgroundColor(color)
    }

    return () => {
      setBackgroundColor(EColors.white)
    }
  }, [color, isFocus, setBackgroundColor])

  return { ...props, insects }
}
