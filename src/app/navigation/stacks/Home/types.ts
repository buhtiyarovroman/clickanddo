import { THomeStackMainScreenParams } from '@/screens/Home/Main'
import { THomeStackSpecialistsScreenParams } from '@/screens/Home/Specialists/types'
import { EScreens } from '../../screens'
import { THomeMapScreenProps } from '@/screens/Home/Map/types'
import { TNavigatorScreenParams } from '../../types'
import { TJobStack } from '../Job'
import { THomeStackNotificationsScreenParams } from '@/screens/Home/Notifications'

export type THomeStack = {
  [EScreens.HomeMain]: THomeStackMainScreenParams
  [EScreens.HomeSpecialists]: THomeStackSpecialistsScreenParams
  [EScreens.HomeSearch]: undefined
  [EScreens.HomeMap]: THomeMapScreenProps
  [EScreens.HomeNotifications]: THomeStackNotificationsScreenParams
  [EScreens.HomeJobStackScreen]: TNavigatorScreenParams<TJobStack>
}
