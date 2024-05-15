import { EScreens } from '@/app/navigation'
import { EPublicationType } from '@/entities/Publication/models'
import { TPublication } from '../../../entities/Publication/models/common'

export type TEditPublicationButtonProps = {
  publication: TPublication
  type: `${EPublicationType}`
}

export type TNavigationScreens = Record<
  EPublicationType,
  | EScreens.ListCreatePublication
  | EScreens.ListCreateSkillBox
  | EScreens.ListSpecialOffer
>
