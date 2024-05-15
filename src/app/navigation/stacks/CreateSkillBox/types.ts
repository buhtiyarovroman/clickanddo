import { EScreens } from '../../screens'

import { TCreateSkillBoxMainScreenParams } from '@/screens/List/CreateSkillBox/Main'
import { TCreateSkillBoxFirstScreenParams } from '@/screens/List/CreateSkillBox/First'
import { TCreateSkillBoxSecondScreenParams } from '@/screens/List/CreateSkillBox/Second'
import { TCreateSkillBoxThirdScreenParams } from '@/screens/List/CreateSkillBox/Third'
import { TCreateSkillBoxFourthScreenParams } from '@/screens/List/CreateSkillBox/Fourth'

export type TCreateSkillBoxStack = {
  [EScreens.CreateSkillBoxMain]: TCreateSkillBoxMainScreenParams
  [EScreens.CreateSkillBoxFirst]: TCreateSkillBoxFirstScreenParams
  [EScreens.CreateSkillBoxSecond]: TCreateSkillBoxSecondScreenParams
  [EScreens.CreateSkillBoxThird]: TCreateSkillBoxThirdScreenParams
  [EScreens.CreateSkillBoxFourth]: TCreateSkillBoxFourthScreenParams
}
