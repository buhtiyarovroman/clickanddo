import {
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import type { THomeStack, TJobStack, TMainStack } from './stacks'
import { TAuthStack } from './stacks/Auth'
import { TRegisterStack } from './stacks/Register'
import { TPersonalDataStack } from './stacks/PersonalData'
import { TProfileStack } from './stacks/Profile'
import { TProjectsStack } from './stacks/Projects'
import { TListStack } from './stacks/List'
import { TSpecialOfferStack } from './stacks/SpecialOffer/types'
import { TCreatePublicationStack } from './stacks/CreatePublication'
import { TCreateSkillBoxStack } from './stacks/CreateSkillBox'
import { TCreateProjectStack } from './stacks/CreateProject'
import { TChatStack } from './stacks/Chat'
import { TFavoritesStack } from './stacks/Favorites'

// TMainTab optional
export type TScreens = TMainStack &
  THomeStack &
  TAuthStack &
  TRegisterStack &
  TPersonalDataStack &
  TProfileStack &
  TProjectsStack &
  TListStack &
  TJobStack &
  TSpecialOfferStack &
  TCreatePublicationStack &
  TCreateSkillBoxStack &
  TCreateProjectStack &
  TChatStack &
  TFavoritesStack

/**
 * Description: use for Screens props
 * @param Screen - Screen name. For this param use EScreens
 * @return Return types for screen params
 */
export type TScreenProps<Screen extends keyof TScreens> =
  NativeStackScreenProps<TScreens, Screen>

/**
 * Description: use for useRoute hook
 * @param Screen - Screen name. For this param use EScreens
 * @return Return types for useRoute hook
 */
export type TScreenQueryProps<Screen extends keyof TScreens> = RouteProp<
  TScreens,
  Screen
>

export type TScreenNavigation<Screen extends keyof TScreens> =
  NativeStackNavigationProp<TScreens, Screen>

export type TNavigatorScreenParams<
  TStack extends ParamListBase,
  TStackParams = undefined,
> = NavigatorScreenParams<TStack> | TStackParams
