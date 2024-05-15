import { Alert } from 'react-native'
import { t } from 'i18next'

import { EPhotoTypes } from '@app/common/types'

export const onUploadPhoto = (onSetPhoto: (val: EPhotoTypes) => void) => {
  Alert.alert(
    t('sign_up.photos.modal.title'),
    '',
    [
      {
        text: t('sign_up.photos.modal.camera'),
        onPress: () => onSetPhoto(EPhotoTypes.Camera),
      },
      {
        text: t('sign_up.photos.modal.gallery'),
        onPress: () => onSetPhoto(EPhotoTypes.Picker),
      },
      {
        text: t('button.cancel'),
        onPress: () => {},
        style: 'cancel',
      },
    ],
    { cancelable: true, userInterfaceStyle: 'dark' },
  )
}

export const generateFormData = async (image: string, chatId: number) => {
  const formData = new FormData()
  formData.append('recipient', JSON.stringify({ chatId }))
  formData.append('message', JSON.stringify({ attachment: { type: 'image' } }))

  formData.append('filedata', {
    uri: image,
    name: image?.split('/')?.[image?.split('/')?.length - 1],
    type: `image/${image?.split('.').pop()}`,
  })

  return formData
}
