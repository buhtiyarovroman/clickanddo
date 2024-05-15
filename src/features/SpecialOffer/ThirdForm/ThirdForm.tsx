import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import { ImageOrVideo } from 'react-native-image-crop-picker'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

import { useTypedSelector } from '@/app/store'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'
import {
  FlexWrapper,
  H3SemiBold,
  MRegular,
  LSemibold,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { styles } from './styles'
import {
  ESpecialOfferCreateThirdFormFields,
  TForm,
  TSpecialOfferCreateThirdFormRef,
  TSpecialOfferThirdFormProps,
} from './types'
import { createSpecialOfferThirdValidation } from './validation'
import { Photos } from '@/shared/ui/Photos'
import { SpecialOfferPhotos } from './ui'

const maxSizeMB = 200

export const ThirdForm = forwardRef<
  TSpecialOfferCreateThirdFormRef,
  TSpecialOfferThirdFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)

  const {
    control,
    getValues,
    trigger,
    formState: { isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSpecialOfferThirdValidation),
    defaultValues: {
      [ESpecialOfferCreateThirdFormFields.photos]:
        createSpecialOffer.photos.map(item => ({
          path: item,
          id: uuidv4(),
        })),
    },
  })

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  const handleOnChangeValid = (photosValue: { id: string; path: string }[]) => {
    onChangeValid(photosValue.length !== 0)
  }
  useEffect(() => {
    handleOnChangeValid(getValues().photos)
  }, [onChangeValid, isValid])

  return (
    <>
      <View>
        <H3SemiBold>{t('add_photos')}</H3SemiBold>
        <MRegular mTop="16px">{t('offer.up_to_20')}</MRegular>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => {
              handleOnChangeValid(value)
              return (
                <>
                  <SpecialOfferPhotos images={value} onChange={onChange} />
                </>
              )
            }}
            name={ESpecialOfferCreateThirdFormFields.photos}
          />
        </View>
      </View>
    </>
  )
})
