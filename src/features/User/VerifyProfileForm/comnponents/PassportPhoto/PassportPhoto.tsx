import React, { useState } from 'react'
import { TPassportPhoto } from './types'
import {
  AbsoluteClose,
  ImagePassport,
  PopoverItem,
  TouchPhoto,
  styles,
} from './styled'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  LSemibold,
  SRegular,
  MRegular,
} from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import Popover from 'react-native-popover-view'
import ImagePicker from 'react-native-image-crop-picker'

export const PassportPhoto = ({
  value = '',
  onChange = () => {},
}: TPassportPhoto) => {
  const [visible, setVisible] = useState(false)

  const { t } = useTranslation()

  const onGetImage = (type: 'camera' | 'gallery') => {
    const method =
      type === 'camera'
        ? ImagePicker.openCamera({
            width: 300,
            height: 200,
            cropping: true,
            compressImageQuality: 0.8,
          })
        : ImagePicker.openPicker({
            mediaType: 'photo',
            width: 300,
            height: 200,
            cropping: true,
            compressImageQuality: 0.8,
          })

    method.then(image => {
      setVisible(false)
      onChange(image.path)
    })
  }

  const openPopover = () => {
    setVisible(true)
  }

  const onClearPhoto = () => {
    onChange('')
  }
  return (
    <>
      {!value && (
        <Popover
          isVisible={visible}
          onRequestClose={() => setVisible(false)}
          from={
            <TouchPhoto onPress={openPopover}>
              <Icon name={'Camera'} fill={EColors.grey_400} />
              <LSemibold mTop={'12px'}>{t('passport_photo')}</LSemibold>
              <SRegular mTop={'5px'} color={EColors.grey_500} align={'center'}>
                {t('passport_photo_desc')}
              </SRegular>
            </TouchPhoto>
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
      )}

      {value && (
        <FlexWrapper>
          <ImagePassport source={value} />
          <AbsoluteClose onPress={onClearPhoto}>
            <Icon size={16} name={'Close'} />
          </AbsoluteClose>
        </FlexWrapper>
      )}
    </>
  )
}
