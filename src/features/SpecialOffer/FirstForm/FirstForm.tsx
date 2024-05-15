import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTypedSelector } from '@/app/store'

import { Hashtags } from '@/features/Projects/Hashtags'

import { getSpecialOfferSelector } from '@/entities/SpecialOffer'

import { Input } from '@/shared/ui/input'
import { H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'

import { createSpecialOfferFirstValidation } from './validation'
import { styles } from '../styles'
import {
  TForm,
  TSpecialOfferCreateFirstFormRef,
  TSpecialOfferFirstFormProps,
} from './types'
import { HideLikes } from '@/shared/ui/HideLikes'

export const FirstForm = forwardRef<
  TSpecialOfferCreateFirstFormRef,
  TSpecialOfferFirstFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createSpecialOffer } = useTypedSelector(getSpecialOfferSelector)

  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSpecialOfferFirstValidation),
    defaultValues: {
      tags: createSpecialOffer.hashtag,
      title: createSpecialOffer.title,
      address: createSpecialOffer.address,
      hideLikes: createSpecialOffer.hideLikes,
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
    <>
      <View style={{ ...styles.section, ...styles.section_first }}>
        <H3SemiBold>{t('title')}</H3SemiBold>
        <MRegular mTop="16px">{t('offer.benefit')}</MRegular>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Standard
              mTop="16px"
              label={t('offer.create_title')}
              value={value}
              onChange={onChange}
              error={errors.title?.message}
            />
          )}
          name={'title'}
        />
      </View>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input.GooglePlaces
            disableFormatted
            value={value}
            label={t('select_location')}
            onSelect={address => setValue('address', address as never)}
            error={errors.address?.message}
          />
        )}
        name={'address'}
      />
      <View style={styles.section}>
        <H3SemiBold>{t('offer.write_tags')}</H3SemiBold>
        <MRegular mTop="16px" mBottom="16px">
          {t('offer.tags_description')}
        </MRegular>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Hashtags
              selectOnUserHashtags
              limit={10}
              withTitle={false}
              hashtag={value}
              onChange={onChange}
              error={errors.tags?.message}
            />
          )}
          name={'tags'}
        />
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <HideLikes {...{ onChange, value }} />
        )}
        name={'hideLikes'}
      />
    </>
  )
})
