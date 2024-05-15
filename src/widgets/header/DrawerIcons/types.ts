import { TIconPropsComponents } from '@/shared/ui/Icon/types'
import { TIconsKeys } from '@assets/Svg'

export type TDrawerIconsHeaderProps = {
  rightIcon?: TIconsKeys
  rightIconProps?: TIconPropsComponents
  onPressRightIcon?: () => void
  title?: string
}
