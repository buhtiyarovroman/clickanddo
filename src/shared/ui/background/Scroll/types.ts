import React, { ReactNode } from 'react'
import { ScrollViewProps } from 'react-native'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'

export type TScrollProps = {
  children?: ReactNode
  pHorizontal?: number
  keyboardShouldPersistTaps?: ScrollViewProps['keyboardShouldPersistTaps']
  extraHeight?: number
  ref?: React.RefObject<KeyboardAwareScrollView>
} & KeyboardAwareScrollViewProps
