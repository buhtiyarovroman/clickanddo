import React, { useCallback, useRef } from 'react'
import { PopoverItem, styles } from './styled'
import { TChatFileMenuProps } from './types'
import { Icon } from '../../Icon'
import { MRegular } from '../../Styled/Styled'
import { useTranslation } from 'react-i18next'
import ImagePicker from 'react-native-image-crop-picker'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DocumentPicker from 'react-native-document-picker'
import { Keyboard } from 'react-native'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '../../bottomSheet/Base'
import { BottomSheetView } from '@gorhom/bottom-sheet'

export const ChatFileMenu = ({
  renderContent = () => <></>,
  onGetPhotoPath = () => {},
  onValidate,
  onGetPhotoArrayPath = () => {},
  onGetPhotoArray = () => {},
  disable = false,
  cropping = false,
  multiple = false,
  onGetArrayPath = () => {},
}: TChatFileMenuProps) => {
  const { t } = useTranslation()

  const ref = useRef<TBottomSheetBaseRef | null>(null)

  const onGetImage = (type: 'camera' | 'gallery') => {
    const isCamera = type === 'camera'

    const method = isCamera
      ? ImagePicker.openCamera({
          cropping,
          compressImageQuality: 0.8,
        })
      : ImagePicker.openPicker({
          mediaType: 'photo',
          cropping,
          multiple,
          compressImageQuality: 0.8,
        })

    method.then(image => {
      let valid = false

      if (onValidate) {
        valid = onValidate(image)
      }

      if (!onValidate) {
        valid = true
      }

      if (valid && multiple && Array.isArray(image)) {
        onGetPhotoArrayPath(image.map(el => el.path))
        onGetPhotoArray(image)
        ref.current?.close()

        return
      }

      if (valid && isCamera && multiple) {
        onGetPhotoArrayPath([image.path])
        onGetPhotoArray([image])
        ref.current?.close()

        return
      }

      valid && onGetPhotoPath(image.path)
      ref.current?.close()
    })
  }

  const handleDocumentSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf],
        copyTo: 'cachesDirectory',
      })

      const files = response
        .filter(item => !!item.fileCopyUri)
        .map(el => el.fileCopyUri!)

      onGetArrayPath(files)
      ref.current?.close()
    } catch (err) {
      console.warn(err)
    }
  }

  const onOpen = () => {
    Keyboard.dismiss()

    ref.current?.open()
  }
  return (
    <>
      <TouchableOpacity disabled={disable} activeOpacity={0.8} onPress={onOpen}>
        {renderContent()}
      </TouchableOpacity>

      <BottomSheet.Base enableDynamicSizing ref={ref}>
        <BottomSheetView style={styles.popover}>
          <PopoverItem onPress={() => onGetImage('gallery')}>
            <Icon name={'Image'} size={24} />
            <MRegular mLeft={'10px'}>{t('photo.gallery')}</MRegular>
          </PopoverItem>

          <PopoverItem onPress={() => onGetImage('camera')}>
            <Icon name={'Camera'} size={24} />
            <MRegular mLeft={'10px'}>{t('photo.camera')}</MRegular>
          </PopoverItem>

          <PopoverItem onPress={handleDocumentSelection}>
            <Icon name={'FilePdf'} size={24} />
            <MRegular mLeft={'10px'}>{t('pdf_file')}</MRegular>
          </PopoverItem>
        </BottomSheetView>
      </BottomSheet.Base>
    </>
  )
}
