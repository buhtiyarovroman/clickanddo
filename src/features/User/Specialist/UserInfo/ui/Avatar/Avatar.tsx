import React from 'react'
import { CameraView, UserImage } from './styled'
import { TUserSpecialistInfoAvatarProps } from './types'
import { ImageOrVideo } from 'react-native-image-crop-picker'
import { Icon } from '@/shared/ui/Icon'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { EColors } from '@/shared/ui/Styled'
import { useDispatch } from 'react-redux'
import { UserEntities, userActions } from '@/entities/User'
import { Input } from '@/shared/ui/input'
import Toast from 'react-native-toast-message'
import { TIconsKeys } from '@assets/Svg'

const maxSizeMB = 3

export const Avatar = ({
  photo = '',
  isEdit = false,
  isCustomer = false,
}: TUserSpecialistInfoAvatarProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const sendPhoto = async (path: string) => {
    try {
      await UserEntities.UserService.pathUserMePhoto({
        photo: path,
      })

      dispatch(userActions.getCurrentUserRequest({}))
      dispatch(userActions.getAllUserRequest({}))
    } catch (err) {
      console.log('sendPhoto err => ', err.response.data)
    }
  }

  const onValidate = (image: ImageOrVideo) => {
    const sizeMB = image.size * 0.000001

    if (sizeMB > maxSizeMB) {
      Toast.show({ type: 'error', text1: t('errors.photo_size') })
      return undefined
    }

    return image
  }

  const CurrentIcon: TIconsKeys = isCustomer ? 'Instruments' : 'Star'

  const CurrentColor = isEdit
    ? EColors.primary
    : isCustomer
    ? EColors.purpure
    : EColors.gold

  return (
    <>
      <Input.PhotoMenu
        cropping
        disable={!isEdit}
        onGetPhotoPath={sendPhoto}
        onValidate={onValidate}
        renderContent={() => (
          <TouchableOpacity activeOpacity={1}>
            <UserImage type={'user'} source={photo} />
            <CameraView color={CurrentColor}>
              {isEdit && (
                <Icon name={'Camera'} fill={EColors.white} size={24} />
              )}

              {!isEdit && (
                <Icon name={CurrentIcon} fill={EColors.white} size={24} />
              )}
            </CameraView>
          </TouchableOpacity>
        )}
      />
    </>
  )
}
