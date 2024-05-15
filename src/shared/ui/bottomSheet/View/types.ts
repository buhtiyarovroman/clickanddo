import { PropsWithChildren } from 'react'

import { BottomSheetProps, BottomSheetModalProps } from '@gorhom/bottom-sheet'

export type TBottomSheetViewProps = Partial<
  Omit<BottomSheetModalProps, 'contentHeight'>
> &
  PropsWithChildren<{
    withScroll?: boolean
    isList?: boolean
    keyboardShouldPersistTaps?: 'always' | 'handled' | 'never'
    snapPoints?: Array<string>
    initialIndex?: number
    onClose?: () => void
    dynamicSizing?: boolean
    scrollEnabled?: boolean
    enablePanDownToClose?: boolean
    hasBackdrop?: boolean
  }>

export type TBottomSheetViewRef = {
  open: () => void
  close: () => void
}
