import { t } from 'i18next'
import { TOnboardingItem } from './types'
import { Png } from '@assets/Png'

export const OnboardingData: TOnboardingItem[] = [
  {
    image: Png.Onboarding1,
    title: t('onboarding.first.title'),
    description: t('onboarding.first.description'),
    imageText: t('onboarding.first.image_text'),
  },
  {
    image: Png.Onboarding2,
    title: t('onboarding.second.title'),
    description: t('onboarding.second.description'),
    imageText: t('onboarding.second.image_text'),
  },
  {
    image: Png.Onboarding3,
    title: t('onboarding.third.title'),
    description: t('onboarding.third.description'),
    imageText: t('onboarding.third.image_text'),
  },
]
