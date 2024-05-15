import { TMargin } from '../../utils'

export enum EGender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export type TGender = {
  label?: string
  value?: EGender
  onChange?: (value: EGender) => void
  disabled?: boolean
} & Partial<TContainer> &
  Pick<Partial<TStyledInputContainer>, 'height'>

export type TContainer = {
  width: string
  disabled: boolean
} & TMargin

export type TStyledInputContainer = {
  height: string
  hasError: boolean
  disabled: boolean
}

export type TStyledInput = {
  hasLeftIcon: boolean
  hasRightIcon: boolean
}
