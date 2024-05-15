import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTypedSelector } from '@/app/store'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'
import { Input } from '@/shared/ui/input'
import { H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import {
  TForm,
  TSpecialOfferCreateFourthFormRef,
  TSpecialOfferFourthFormProps,
} from './types'
import { createSpecialOfferFourthValidation } from './validation'

export const FourthForm = forwardRef<
  TSpecialOfferCreateFourthFormRef,
  TSpecialOfferFourthFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)

  const {
    control,
    getValues,

    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSpecialOfferFourthValidation),
    defaultValues: {
      description: createSpecialOffer.description,
    },
  })

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  useEffect(() => {
    onChangeValid(isValid)
  }, [isValid, onChangeValid])

  return (
    <View>
      <H3SemiBold>{t('offer.description_title')}</H3SemiBold>
      <MRegular mTop="16px">{t('offer.description_sub')}</MRegular>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input.TextArea
            placeholder={t('offer.description_placeholder')}
            showTextLimit
            limit={1500}
            mTop="16px"
            value={value}
            onChange={onChange}
            error={errors.description?.message}
          />
        )}
        name={'description'}
      />
    </View>
  )
})
