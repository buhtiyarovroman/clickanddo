import { useCallback, useState } from 'react'
import { useBottomSheetInternal } from '@gorhom/bottom-sheet'

const useBottomSheetInternalConditional = (isBottomSheet: boolean) => {
  return isBottomSheet ? useBottomSheetInternal : () => null
}

export const useBottomSheetKeyboard = ({
  isBottomSheet,
}: {
  isBottomSheet: boolean
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const bottomSheetInternal = useBottomSheetInternalConditional(isBottomSheet)()

  const onFocus = useCallback(() => {
    setIsFocused(true)
    if (isBottomSheet && bottomSheetInternal?.shouldHandleKeyboardEvents) {
      bottomSheetInternal.shouldHandleKeyboardEvents.value = true
    }
  }, [isBottomSheet, bottomSheetInternal?.shouldHandleKeyboardEvents])

  const onBlur = useCallback(() => {
    setIsFocused(false)
    if (isBottomSheet && bottomSheetInternal?.shouldHandleKeyboardEvents) {
      bottomSheetInternal.shouldHandleKeyboardEvents.value = false
    }
  }, [isBottomSheet, bottomSheetInternal?.shouldHandleKeyboardEvents])

  return { onFocus, onBlur, isFocused }
}
