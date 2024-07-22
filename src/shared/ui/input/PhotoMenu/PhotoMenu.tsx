import React, { useState } from 'react'
import { PopoverItem, styles } from './styled'
import { TPhotoMenuProps } from './types'
import { Icon } from '../../Icon'
import { FlexWrapper, MRegular } from '../../Styled/Styled'
import { useTranslation } from 'react-i18next'
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker'
import Popover from 'react-native-popover-view'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const PhotoMenu = ({
  renderContent = () => <></>,
  onGetPhotoPath = () => {},
  onValidate,
  onGetPhotoArrayPath = () => {},
  onGetPhotoArray = () => {},
  disable = false,
  cropping = false,
  multiple = false,
  maxFiles = 1,
}: TPhotoMenuProps) => {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation()

  const onGetImage = (type: 'camera' | 'gallery') => {
    const isCamera = type === 'camera'

    const method = isCamera
      ? ImagePicker.openCamera({
          cropping,
          compressImageQuality: 0.6,
        })
      : ImagePicker.openPicker({
          maxFiles: maxFiles,

          mediaType: 'photo',
          cropping,
          multiple,
          compressImageQuality: 0.6,
        })

    method.then(async image => {
      let validImage: ImageOrVideo | ImageOrVideo[] | undefined

      if (onValidate) {
        validImage = await onValidate(image)
      }

      if (!onValidate) {
        validImage = image
      }

      if (!!validImage && multiple && Array.isArray(validImage)) {
        onGetPhotoArrayPath(validImage.map(el => el.path))
        onGetPhotoArray(validImage)
        setVisible(false)

        return
      }

      if (!!validImage && isCamera && multiple) {
        onGetPhotoArrayPath([validImage.path])
        onGetPhotoArray([validImage])
        setVisible(false)

        return
      }

      onGetPhotoPath(validImage.path)

      setVisible(false)
    })
  }

  return (
    <Popover
      isVisible={visible}
      onRequestClose={() => setVisible(false)}
      from={
        <TouchableOpacity
          disabled={disable}
          activeOpacity={0.8}
          onPress={() => {
            setVisible(true)
          }}>
          {renderContent()}
        </TouchableOpacity>
      }>
      <FlexWrapper
        style={styles.popover}
        flexDirection={'column'}
        align={'flex-start'}>
        <PopoverItem onPress={() => onGetImage('gallery')}>
          <Icon name={'Image'} size={24} />
          <MRegular mLeft={'10px'}>{t('photo.gallery')}</MRegular>
        </PopoverItem>

        <PopoverItem onPress={() => onGetImage('camera')}>
          <Icon name={'Camera'} size={24} />
          <MRegular mLeft={'10px'}>{t('photo.camera')}</MRegular>
        </PopoverItem>
      </FlexWrapper>
    </Popover>
  )
}
