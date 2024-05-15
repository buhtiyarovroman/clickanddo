import { EScreens } from '../../screens'
import { TRegisterSecondScreenProps } from '@/screens/Register/Second'
import { TRegisterMainScreenProps } from '@/screens/Register/Main/types'

export type TRegisterStack = {
  [EScreens.RegisterMain]: TRegisterMainScreenProps
  [EScreens.RegisterSecond]: TRegisterSecondScreenProps
}
