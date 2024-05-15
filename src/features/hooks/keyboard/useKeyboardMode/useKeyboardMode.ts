import { useEffect } from 'react'
import {
  AndroidSoftInputModes,
  KeyboardController,
} from 'react-native-keyboard-controller'

export const useKeyboardMode = (
  inputMode = AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
) => {
  useEffect(() => {
    KeyboardController.setInputMode(inputMode)

    return () => KeyboardController.setDefaultMode()
  }, [])

  return { inputMode }
}
