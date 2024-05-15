import { TMargin } from '../../utils'

export enum EGender {
  male = 'male',
  female = 'female',
  other = 'other',
}

export type TCheckboxProps = {
  value?: boolean
  onChange?: (value: boolean) => void
  size?: number
} & TMargin
