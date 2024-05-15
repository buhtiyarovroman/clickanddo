import { EScreens } from '../../screens'
import { TSpecialOfferParams } from '@/screens/List/SpecialOffer/Intro/types'
import { TNavigatorScreenParams } from '../../types'

import { TListStackMapScreenParams } from '@/screens/List/Map'
import { TListStackMainScreenParams } from '@/screens/List/Main'
import { TListStackMyCalendarScreenParams } from '@/screens/List/MyCalendar'

import { TCreateSkillBoxStack } from '../CreateSkillBox'

import { TCreatePublicationStack } from '../CreatePublication'
import { TJobStack } from '../Job'
import { TPublicationStack } from '../Publication'

export type TListStack = {
  [EScreens.ListMain]: TListStackMainScreenParams
  [EScreens.ListMyCalendar]: TListStackMyCalendarScreenParams
  [EScreens.ListSpecialOffer]: TSpecialOfferParams
  [EScreens.ListCreatePublication]: TNavigatorScreenParams<TCreatePublicationStack>
  [EScreens.ListCreateSkillBox]: TNavigatorScreenParams<TCreateSkillBoxStack>
  [EScreens.ListPublicationStack]: TNavigatorScreenParams<TPublicationStack>
  [EScreens.ListJobs]: TNavigatorScreenParams<TJobStack>
  [EScreens.ListMap]: TListStackMapScreenParams
}
