import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTypedSelector } from '@/app/store'
import { getSpecialOfferSelector } from '@/entities/SpecialOffer'
import { H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { DatePicker } from '@/shared/ui/input/DatePicker'
import { Input } from '@/shared/ui/input'
import {
  ESpecialOfferCreateSecondFormFields,
  TForm,
  TSpecialOfferCreateSecondFormRef,
  TSpecialOfferSecondFormProps,
} from './types'
import { styles } from '../styles'
import { createSpecialOfferSecondValidation } from './validation'

export const SecondForm = forwardRef<
  TSpecialOfferCreateSecondFormRef,
  TSpecialOfferSecondFormProps
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
    resolver: zodResolver(createSpecialOfferSecondValidation),
    defaultValues: {
      priceFrom: createSpecialOffer.priceFrom + '',
      priceTo: createSpecialOffer.priceTo + '',
      duration: createSpecialOffer.duration,
      expirationDate: createSpecialOffer.expirationDate,
      currency: createSpecialOffer.currency,
    },
  })

  const onPriceBlur = async () => {
    if (getValues().priceTo < getValues().priceFrom) {
      setValue(
        ESpecialOfferCreateSecondFormFields.priceTo,
        getValues().priceFrom + 1,
      )
    }
  }

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      onPriceBlur()
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
        <H3SemiBold>{t('offer.price_setting')}</H3SemiBold>
        <MRegular mTop="16px" mBottom="16px">
          {t('offer.price_description')}
        </MRegular>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Controller
              control={control}
              render={({
                field: { onChange: onChangeInput, value: valueInput },
              }) => (
                <Input.Currency
                  onBlur={onPriceBlur}
                  mBottom="16px"
                  error={errors.priceFrom?.message}
                  currency={value}
                  onChangeCurrency={onChange}
                  onChangeInput={budget => {
                    onChangeInput(budget)
                  }}
                  value={valueInput}
                />
              )}
              name={'priceFrom'}
            />
          )}
          name={'currency'}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Controller
              control={control}
              render={({
                field: { onChange: onChangeInput, value: valueInput },
              }) => (
                <Input.Currency
                  onBlur={onPriceBlur}
                  error={errors.priceTo?.message}
                  currency={value}
                  onChangeCurrency={onChange}
                  onChangeInput={budget => {
                    onChangeInput(budget)
                  }}
                  value={valueInput}
                />
              )}
              name={'priceTo'}
            />
          )}
          name={'currency'}
        />
      </View>
      <View style={styles.section}>
        <H3SemiBold>{t('duration')}</H3SemiBold>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Standard
              keyboardType="number-pad"
              mTop="16px"
              label={t('hours')}
              value={value}
              onChange={onChange}
              error={errors.duration?.message}
            />
          )}
          name={'duration'}
        />
      </View>
      <View style={styles.section}>
        <H3SemiBold>{t('offer.terms')}</H3SemiBold>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DatePicker
              pickerProps={{ minimumDate: new Date() }}
              withIconLeft
              label={t('offer.expiration_date')}
              mTop="16px"
              date={new Date(value)}
              setDate={onChange}
              error={errors.duration?.message}
            />
          )}
          name={'expirationDate'}
        />
      </View>
    </>
  )
})
