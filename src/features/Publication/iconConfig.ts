import { EPublicationType } from '@/entities/Publication/models'
import { TIconsKeys } from '@assets/Svg'

export const iconMapping: Record<EPublicationType, TIconsKeys> = {
  [EPublicationType.publication]: 'TypePublication',
  [EPublicationType.skillbox]: 'TypeSkillBox',
  [EPublicationType.specialOffer]: 'TypeSpecialOffer',
}
