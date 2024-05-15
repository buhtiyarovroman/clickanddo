import { EScreens } from '../../screens'
import { TProjectsMainScreenParams } from '@/screens/Projects/Main'
import { TProjectResponsesScreenParams } from '@/screens/Projects/ProjectResponses'
import { TJobStack } from '../Job'
import { TNavigatorScreenParams } from '../../types'
import { TCreateProjectStack } from '../CreateProject'
import { TPublicationStack } from '../Publication'

export type TProjectsStack = {
  [EScreens.ProjectsMain]: TProjectsMainScreenParams
  [EScreens.ProjectResponses]: TProjectResponsesScreenParams
  [EScreens.ProjectJobStack]: TNavigatorScreenParams<TJobStack>
  [EScreens.ProjectCreateStack]: TNavigatorScreenParams<TCreateProjectStack>
  [EScreens.ProjectPublicationStack]: TNavigatorScreenParams<TPublicationStack>
}
