import { ImageSource } from 'react-native-image-viewing/dist/@types'

export type TImageViewProps = {
  data?: ImageSource[]
  index?: number
  bottom?: number
}

export type TImageViewRef = {
  show: () => void
  hide: () => void
}
