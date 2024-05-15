import { TIconProps } from '@/shared/ui/Icon/types'
import { TIconsKeys } from '@assets/Svg'

export type TStandardProps = {
  title?: string
  goBack?: boolean
  leftIcon?: TIconsKeys
  leftIconProps?: Omit<TIconProps, 'name'>
  rightIcon?: TIconsKeys
  rightIconProps?: Omit<TIconProps, 'name'>
  onPressRightIcon?: () => void
  onPressLeftIcon?: () => void
  onGoBack?: () => void
  disableShadow?: boolean
}
