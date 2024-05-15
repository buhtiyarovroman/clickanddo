import { EScreens, TJobStack } from '@/app/navigation'
import { THomeStackNotificationsScreenParams } from '@/screens/Home/Notifications'
import { TNavigatorScreenParams } from '../../types'
import { TPublicationStack } from '../Publication'

export type TFavoritesStack = {
  [EScreens.FavoritesMain]: undefined
  [EScreens.FavoritesPublicationStack]: TNavigatorScreenParams<TPublicationStack>
  [EScreens.HomeNotifications]: THomeStackNotificationsScreenParams
  [EScreens.JobStack]: TNavigatorScreenParams<TJobStack>
}
