import { EScreens } from '../../screens'
import { TProfileOtherProfileScreenParams } from '@/screens/Profile/OtherProfile/types'
import { TProjectsJobScreenParams } from '@/screens/Projects/Job'
import { NavigatorScreenParams } from '@react-navigation/native'
import { TCreateProjectStack } from '../CreateProject'
import { TProjectResponsesChatsScreenParams } from '@/screens/Projects/ResponsesChats'
import { TChatChatScreenParams } from '@/screens/Chat/Chat'

export type TJobStack = {
  [EScreens.JobMain]: TProjectsJobScreenParams
  [EScreens.JobProfile]: TProfileOtherProfileScreenParams
  [EScreens.JobResponsesChats]: TProjectResponsesChatsScreenParams
  [EScreens.ChatChat]: TChatChatScreenParams
  [EScreens.JobCreateProjectStack]: NavigatorScreenParams<TCreateProjectStack>
}
