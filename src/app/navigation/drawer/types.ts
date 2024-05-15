import { TDrawerSupportScreenProps } from '@/screens/Drawer/Support/types'
import { TDrawerSettingsScreenProps } from '@/screens/Drawer/Settings/types'
import { TDrawerPaymentDataScreenProps } from '@/screens/Drawer/PaymentData/types'

import { TTabStack } from '../tabs/Main/types'
import { TPersonalDataStack } from '../stacks/PersonalData'

import { TNavigatorScreenParams } from '../types'

export enum EDrawerStackScreens {
  TabStack = 'TabStack',
  ProfileStack = 'ProfileStack',
  PersonalDataStack = 'PersonalDataStack',
  Settings = 'SettingsScreen',
  PaymentData = 'PaymentDataScreen',
  Support = 'SupportScreen',
}

export type TDrawerStack = {
  [EDrawerStackScreens.TabStack]: TNavigatorScreenParams<TTabStack>
  [EDrawerStackScreens.ProfileStack]: TNavigatorScreenParams<TTabStack>
  [EDrawerStackScreens.PersonalDataStack]: TNavigatorScreenParams<TPersonalDataStack>
  [EDrawerStackScreens.Settings]: TDrawerSettingsScreenProps
  [EDrawerStackScreens.PaymentData]: TDrawerPaymentDataScreenProps
  [EDrawerStackScreens.Support]: TDrawerSupportScreenProps
}
