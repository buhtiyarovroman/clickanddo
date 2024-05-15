import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  EPersonalDataFormFields,
  TPersonalDataForm,
  TPersonalDataFormProps,
  TPersonalDataFormRef,
} from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { personalDataValidation } from './validation'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'

import { useIsFocused } from '@react-navigation/native'
import { TPhoneInputRef } from '@/shared/ui/input/Phone/types'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'
import { parsePhoneNumber } from 'libphonenumber-js'

export const PersonalDataForm = forwardRef<
  TPersonalDataFormRef,
  TPersonalDataFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const phoneRef = useRef<TPhoneInputRef | null>(null)
  const { setLoading } = useContext(LoaderContext)

  const {
    control,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm<TPersonalDataForm>({
    resolver: zodResolver(personalDataValidation),
    defaultValues: {
      [EPersonalDataFormFields.phone]: '',
      [EPersonalDataFormFields.name]: '',
      [EPersonalDataFormFields.email]: '',
      [EPersonalDataFormFields.location]: '',
    },
  })

  const getGeneralInfo = async () => {
    try {
      setLoading(true)

      const response = await UserService.getGeneralUserInfo({})

      console.log('response => ', response.data)

      if (response.data.email) {
        setValue(EPersonalDataFormFields.email, response.data.email)
      }

      if (response.data.location) {
        setValue(EPersonalDataFormFields.location, response.data.location)
      }

      if (response.data.name) {
        setValue(EPersonalDataFormFields.name, response.data.name)
      }

      if (response.data.phone) {
        setValue(
          EPersonalDataFormFields.phone,
          parsePhoneNumber(response.data.phone).nationalNumber,
        )
      }
    } catch (err) {
      console.log('getGeneralInfo err =>', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    isFocused && getGeneralInfo()
  }, [isFocused])

  useEffect(() => {
    const subscription = watch(() => {
      onChangeValid(isValid)
    })

    return () => subscription.unsubscribe()
  }, [watch, isValid, onChangeValid])

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const phoneInfo = phoneRef.current?.getPhoneInfo()

      if (!phoneInfo?.countryCode) {
        console.error('countryCode is undefined ')
        return null
      }

      const isFormValid = await trigger()
      if (!isFormValid) return null

      return {
        ...getValues(),
        phone: phoneInfo.countryCode + getValues().phone,
      }
    },
  }))

  return (
    <FlexWrapper flexDirection={'column'} style={styles.main}>
      {/* <Controller
        control={control}
        name={EPersonalDataFormFields.email}
        render={({ field: { ...renderProps } }) => (
          <></>
          // <Input.Standard
          //   label={t('inputs.email')}
          //   error={errors.email?.message}
          //   mBottom={'20px'}
          //   {...renderProps}
          // />
        )}
      /> */}

      <Controller
        control={control}
        name={EPersonalDataFormFields.name}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            mBottom={'20px'}
            label={t('inputs.name')}
            error={errors.name?.message}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EPersonalDataFormFields.phone}
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
        name={EPersonalDataFormFields.email}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            mBottom={'20px'}
            label={t('inputs.email')}
            error={errors.name?.message}
            autoComplete={'email'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EPersonalDataFormFields.location}
        render={({ field: { value, onChange } }) => (
          <Input.GooglePlaces
            value={value}
            onSelect={location => onChange(location)}
            label={t('inputs.country')}
            error={errors.name?.message}
          />
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
