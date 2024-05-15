import { ImageOrVideo } from 'react-native-image-crop-picker'

export type TChatFileMenuProps = {
  renderContent: () => JSX.Element
  onValidate?: (image: ImageOrVideo) => boolean
  onGetPhotoPath?: (path: string) => void
  onGetPhotoArrayPath?: (path: string[]) => void
  onGetPhotoArray?: (path: ImageOrVideo[]) => void
  onGetArrayPath?: (path: string[]) => void
  disable?: boolean
  cropping?: boolean
  multiple?: boolean
}
