import { EScreens } from '../../screens'

import { TCreatePublicationMainScreenParams } from '@/screens/List/CreatePublication/Main'
import { TCreatePublicationSuccessScreenParams } from '@/screens/List/CreatePublication/Success'

export type TCreatePublicationStack = {
  [EScreens.CreatePublicationMain]: TCreatePublicationMainScreenParams
  [EScreens.CreatePublicationSuccess]: TCreatePublicationSuccessScreenParams
}
