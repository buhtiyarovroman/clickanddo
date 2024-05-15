import { TIconsKeys } from '@assets/Svg'
import { TPressAddress } from '../../types'

export type TDefaultListProps = {
  onSelect?: (value: TPressAddress) => void
}

export type TDefaultListData = {
  title: string
  visibleRadius?: string
  location?: number[]
  radius?: number
  isMyLocation?: boolean
  icon?: TIconsKeys
  needTranslate?: boolean
}
