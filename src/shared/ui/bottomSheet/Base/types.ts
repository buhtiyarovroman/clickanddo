import { EColors } from '@/shared/ui/Styled'
import { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'

export type TBottomSheetBaseRef = {
  open: () => void
  close: () => void
}

export type TBottomSheetBaseProps = {
  children?: ReactNode
  visible?: boolean
  snapPoints?: string[]
  backgroundColor?: EColors
  onClose?: () => void
  disableBackdrop?: boolean
  enableDynamicSizing?: boolean
  containerStyle?: StyleProp<ViewStyle>
  borderRadius?: number
  isList?: boolean
  onBackdropPress?: () => void
}
