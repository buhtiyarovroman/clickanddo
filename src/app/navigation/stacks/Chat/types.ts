import { TChatChatScreenParams } from '@/screens/Chat/Chat'
import { EScreens } from '../../screens'
import { TChatMainScreenParams } from '@/screens/Chat/Main'
import { TNavigatorScreenParams } from '../../types'
import { TJobStack } from '../Job'
import { THomeStackNotificationsScreenParams } from '@/screens/Home/Notifications'

export type TChatStack = {
  [EScreens.ChatMain]: TChatMainScreenParams
  [EScreens.ChatChat]: TChatChatScreenParams
  [EScreens.JobStack]: TNavigatorScreenParams<TJobStack>
  [EScreens.HomeNotifications]: THomeStackNotificationsScreenParams
}
