import { EGender } from '@/shared/ui/input/Gender/types'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { TUser } from '../../models'

export * from './disableLoaderRequest'

export type TInitialUserState = {
  user: TUser | null
  userSessions: TUser[]

  registerData: TRegisterData
  seeOnboarding: boolean
  loading: boolean
  setting: TSetting
}

export type TSetting = {
  currency: TCurrencyValue
}

export enum EExecutorSecondFormFields {
  name = 'name',
  login = 'login',
  secondName = 'secondName',
  gender = 'gender',
  birthday = 'birthday',
  country = 'country',
  city = 'city',
  location = 'location',
}
export type TRegisterData = {
  [EExecutorSecondFormFields.name]: string
  [EExecutorSecondFormFields.login]: string
  [EExecutorSecondFormFields.secondName]: string
  [EExecutorSecondFormFields.gender]: EGender
  [EExecutorSecondFormFields.birthday]: Date
  [EExecutorSecondFormFields.country]: string
  [EExecutorSecondFormFields.location]: number[]
}

// & TBaseInitialState
