import { TPersonalDataVerifyPhoneScreenProps } from '@/screens/PersonalData/VerifyPhone'
import { EScreens } from '../../screens'
import { TPersonalDataMainScreenProps } from '@/screens/PersonalData/Main'

export type TPersonalDataStack = {
  [EScreens.PersonalDataMain]: TPersonalDataMainScreenProps
  [EScreens.PersonalDataPhoneVerify]: TPersonalDataVerifyPhoneScreenProps
}
