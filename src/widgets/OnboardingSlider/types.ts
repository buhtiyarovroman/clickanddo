import { ImageSourcePropType } from 'react-native'

export type TOnboardingItem = {
  image: ImageSourcePropType
  title: string
  description: string
  imageText: string
}

export type TOnboardingBannersProps = {
  onEnd: () => void
}
