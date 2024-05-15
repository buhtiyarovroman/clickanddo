import { TProfileMainScreenParams } from '@/screens/Profile/Main/types'
import { EScreens } from '../../screens'
import { TProfileAccountDataScreenProps } from '@/screens/Profile/AccountData'
import { TProfileLanguagesScreenParams } from '@/screens/Profile/Languages/types'
import { TProfileVerifyProfileScreenParams } from '@/screens/Profile/VerifyProfile/types'
import { TProfileEducationScreenParams } from '@/screens/Profile/Education/types'
import { TProfileWorkScreenParams } from '@/screens/Profile/Work/types'
import { TProfileOtherExperienceScreenParams } from '@/screens/Profile/OtherExperience/types'
import { TNavigatorScreenParams } from '../../types'
import { TJobStack } from '../Job'

export type TProfileStack = {
  [EScreens.ProfileMain]: TProfileMainScreenParams
  [EScreens.ProfileAccountData]: TProfileAccountDataScreenProps
  [EScreens.ProfileAddInfoLanguage]: TProfileLanguagesScreenParams
  [EScreens.ProfileAddInfoVerification]: TProfileVerifyProfileScreenParams
  [EScreens.ProfileAddInfoEducation]: TProfileEducationScreenParams
  [EScreens.ProfileAddInfoWork]: TProfileWorkScreenParams
  [EScreens.JobStack]: TNavigatorScreenParams<TJobStack>
}
