import { ImageSourcePropType } from 'react-native'

export type TRegisterVariantProps = {
  title: string
  description: string
  image: ImageSourcePropType
  onPress?: () => void
}
