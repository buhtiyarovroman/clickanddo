import { TIconsKeys } from '@assets/Svg'
import { TMargin } from '../../utils'

export type TIconButtonProps = {
  onPress?: () => void
  icon?: TIconsKeys
  iconSize?: number
} & Partial<TStyledButton>

export type TStyledButton = {} & TMargin
