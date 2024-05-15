import { ImageOrVideo } from 'react-native-image-crop-picker'

export type TPhotoMenuProps = {
  renderContent: () => JSX.Element
  onValidate?: (image: ImageOrVideo) => boolean
  onGetPhotoPath?: (path: string) => void
  onGetPhotoArrayPath?: (path: string[]) => void
  onGetPhotoArray?: (path: ImageOrVideo[]) => void
  disable?: boolean
  cropping?: boolean
  multiple?: boolean
  maxFiles?: number
}