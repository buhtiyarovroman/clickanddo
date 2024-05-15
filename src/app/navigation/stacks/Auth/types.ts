import { TAuthOnboardingScreenProps } from '@/screens/Auth/Onboarding/types'
import { EScreens } from '../../screens'
import { TAuthMainScreenProps } from '@/screens/Auth/Main/types'
import { TRegisterStack } from '../Register'
import { TNavigatorScreenParams } from '../../types'
import { TAuthLoginScreenProps } from '@/screens/Auth/Login/types'
import { TAuthEmailSendedScreenProps } from '@/screens/Auth/EmailSended/types'
import { TAuthVerifyPhoneScreenProps } from '@/screens/Auth/VerifyPhone/types'

export type TAuthStack = {
  [EScreens.AuthOnboarding]: TAuthOnboardingScreenProps
  [EScreens.AuthMain]: TAuthMainScreenProps
  [EScreens.AuthLogin]: TAuthLoginScreenProps
  [EScreens.AuthEmailSended]: TAuthEmailSendedScreenProps
  [EScreens.AuthVerifyPhone]: TAuthVerifyPhoneScreenProps
  [EScreens.AuthRegister]: TNavigatorScreenParams<TRegisterStack>
}
