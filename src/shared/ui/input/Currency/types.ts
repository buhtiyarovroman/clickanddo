import { TMargin } from '@/shared/ui/utils'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { AndroidSoftInputModes } from 'react-native-keyboard-controller'

export type TCurrencyProps = {
  value?: string
  onChangeInput?: (value: string) => void
  currency?: TCurrencyValue
  onChangeCurrency?: (value: string) => void
  error?: string
  label?: string
  fontSize?: number
  onBlur?: () => void
  disabled?: boolean
  inputMode?: AndroidSoftInputModes
} & TMargin
