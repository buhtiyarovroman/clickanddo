import { TMargin } from '../../utils'
import { TIconsKeys } from '@assets/Svg'
import { TIconPropsComponents } from '../../Icon/types'
import { THashTag } from '@/entities/User/models'

export type THashtagInputProps = {
  placeholder?: string
  error?: string
  value?: THashTag[]
  leftIcon?: TIconsKeys
  onChange?: (text: string) => void
  onDelete?: (id: string) => void
  onPress?: () => void
  leftIconProps?: TIconPropsComponents
  inputValue?: string
  onChangeInput?: (value: string) => void
  limit?: number
  disabled?: boolean
} & Partial<TContainer> &
  Partial<TStyledInputContainer>

export type TContainer = {} & TMargin

export type TStyledInputContainer = {
  hasError: boolean
}
