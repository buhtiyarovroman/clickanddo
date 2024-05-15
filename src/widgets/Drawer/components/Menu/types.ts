import { TIconsKeys } from '@assets/Svg'

export type TDrawerButtonData = {
  text:
    | 'profile'
    | 'payment_data'
    | 'settings'
    | 'logout'
    | 'help_and_support'
    | 'personal_data'
  icon: TIconsKeys
  bottomLine?: boolean
}
