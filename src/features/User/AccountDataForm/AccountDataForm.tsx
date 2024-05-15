import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  EAccountDataFormFields,
  TForm,
  TAccountDataFormProps,
  TAccountDataFormRef,
} from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { accountDataFormValidation } from './validation'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'

import { getUserSelector } from '@/entities/User'
import { useTypedSelector } from '@/app/store'
import { TPhoneInputRef } from '@/shared/ui/input/Phone/types'
import { parsePhoneNumber } from 'libphonenumber-js'

export const AccountDataForm = forwardRef<
  TAccountDataFormRef,
  TAccountDataFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)
  const isCustomer = user?.role === 'customer'
  const phoneRef = useRef<TPhoneInputRef | null>(null)

  const {
    control,
    getValues,
    trigger,
    setError,
    watch,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(accountDataFormValidation),
    defaultValues: {
      [EAccountDataFormFields.name]: user?.name ?? '',
      [EAccountDataFormFields.secondName]: user?.secondName ?? '',
      [EAccountDataFormFields.email]: user?.email ?? '',
      [EAccountDataFormFields.login]: user?.login ?? '',
      [EAccountDataFormFields.phone]: user?.phone
        ? parsePhoneNumber(user?.phone).nationalNumber
        : '',
      [EAccountDataFormFields.location]: user?.country,
      [EAccountDataFormFields.coordinates]:
        user?.location?.coordinates?.map(el => +el) || [],
    },
  })

  useEffect(() => {
    const subscription = watch(() => {
      onChangeValid(isValid)
    })

    return () => subscription.unsubscribe()
  }, [watch, isValid, onChangeValid])

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      const phoneInfo = phoneRef.current?.getPhoneInfo()

      if (!isFormValid) return null

      if (!phoneInfo?.countryCode) {
        console.error('countryCode is undefined ')
        return null
      }

      const data = getValues()

      if (isCustomer && !data.about) {
        setError(EAccountDataFormFields.description, {
          message: t('validation_error.no_empty'),
        })

        return null
      }

      return {
        ...data,
        phone: phoneInfo.countryCode.replace('+', '') + data.phone,
      }
    },
  }))

  return (
    <FlexWrapper flexDirection={'column'} style={styles.main}>
      <Controller
        control={control}
        name={EAccountDataFormFields.name}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('inputs.name')}
            error={errors.name?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />
      <Controller
        control={control}
        name={EAccountDataFormFields.secondName}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('inputs.surname')}
            error={errors.secondName?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EAccountDataFormFields.email}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('inputs.email')}
            error={errors.email?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EAccountDataFormFields.login}
        render={({ field: { ...renderProps } }) => (
          <Input.Mask
            error={errors.login?.message}
            label={t('inputs.nickname')}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EAccountDataFormFields.phone}
        render={({ field: { ...renderProps } }) => (
          <Input.Phone
            mBottom={'20px'}
            label={t('inputs.phone_title')}
            error={errors.phone?.message}
            {...renderProps}
            ref={phoneRef}
          />
        )}
      />

      <Controller
        control={control}
        name={EAccountDataFormFields.location}
        render={({ field: { onChange, value } }) => (
          <>
            <Controller
              control={control}
              name={EAccountDataFormFields.coordinates}
              render={({ field: { onChange: onChangeCoordinates } }) => (
                <Input.GooglePlaces
                  disableFormatted
                  value={value}
                  onSelect={(address, cords) => {
                    onChange(address)
                    if (!cords) onChangeCoordinates([])
                    if (cords) onChangeCoordinates([cords?.lng, cords?.lat])
                  }}
                  error={errors.location?.message}
                  label={t('inputs.country')}
                />
              )}
            />
          </>
        )}
      />
    </FlexWrapper>
  )
})

const styles = StyleSheet.create({
  main: {
    paddingVertical: 18,
  },
})
