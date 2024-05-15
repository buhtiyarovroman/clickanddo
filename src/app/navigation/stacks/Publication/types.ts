import { EScreens } from '../../screens'

import { TPublicationScreenParams } from '@/screens/List/Publication/types'
import { TPublicationResponsesScreenParams } from '@/screens/List/PublicationResponses/types'

export type TPublicationStack = {
  [EScreens.PublicationScreen]: TPublicationScreenParams
  [EScreens.PublicationResponses]: TPublicationResponsesScreenParams
}
