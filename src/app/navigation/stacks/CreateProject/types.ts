import { TProjectsCreateFirstScreenParams } from '@/screens/CreateProject/First'
import { EScreens } from '../../screens'
import { TProjectsCreateSecondScreenParams } from '@/screens/CreateProject/Second'
import { TProjectsCreateThirdScreenParams } from '@/screens/CreateProject/Third'
import { TProjectsCreateFourthScreenParams } from '@/screens/CreateProject/Fourth'
import { TProjectsPreviewScreenParams } from '@/screens/CreateProject/Preview'
import { TProjectsCreateSuccessScreenParams } from '@/screens/CreateProject/CreateSuccess'
import { TProjectsCreatePersonalScreenParams } from '@/screens/CreateProject/Personal'

export type TCreateProjectStack = {
  [EScreens.ProjectCreateFirst]: TProjectsCreateFirstScreenParams
  [EScreens.ProjectCreateSecond]: TProjectsCreateSecondScreenParams
  [EScreens.ProjectCreateThird]: TProjectsCreateThirdScreenParams
  [EScreens.ProjectCreateFourth]: TProjectsCreateFourthScreenParams
  [EScreens.ProjectPreviewScreen]: TProjectsPreviewScreenParams
  [EScreens.ProjectCreateSuccess]: TProjectsCreateSuccessScreenParams
  [EScreens.ProjectCreatePersonal]: TProjectsCreatePersonalScreenParams
}
