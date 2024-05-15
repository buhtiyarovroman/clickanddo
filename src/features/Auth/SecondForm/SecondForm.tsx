import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TForm, TSecondFormProps, TSecondFormRef } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { executorSecondValidation } from './validation'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'

import { DatePicker } from './components'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { getUserSelector, userActions } from '@/entities/User'
import { EExecutorSecondFormFields } from '@/entities/User/store/types'
import { useTypedSelector } from '@/app/store'

export const SecondForm = forwardRef<TSecondFormRef, TSecondFormProps>(
  ({ onChangeValid = () => {} }, ref) => {
    const { t } = useTranslation()
    const isFocused = useIsFocused()
    const { registerData } = useTypedSelector(getUserSelector)
    const dispatch = useDispatch()

    const {
      control,
      getValues,
      trigger,
      watch,
      formState: { errors, isValid },
    } = useForm<TForm>({
      resolver: zodResolver(executorSecondValidation),
      defaultValues: {
        ...registerData,
        [EExecutorSecondFormFields.birthday]: new Date(
          registerData[EExecutorSecondFormFields.birthday],
        ),
      },
    })

    useEffect(() => {
      if (!isFocused) dispatch(userActions.setRegisterData(getValues()))
    }, [dispatch, isFocused])

    useEffect(() => {
      const subscription = watch(() => {
        onChangeValid(isValid)
      })

      return () => subscription.unsubscribe()
    }, [watch, isValid, onChangeValid])

    useImperativeHandle(ref, () => ({
      getForm: async () => {
        const isFormValid = await trigger()
        if (!isFormValid) return null

        return getValues()
      },
    }))

    return (
      <FlexWrapper flexDirection={'column'} style={styles.main}>
        <Controller
          control={control}
          name={EExecutorSecondFormFields.name}
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
          name={EExecutorSecondFormFields.secondName}
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
          name={EExecutorSecondFormFields.login}
          render={({ field: { ...renderProps } }) => (
            <Input.Mask
              label={t('inputs.nickname')}
              error={errors.login?.message}
              mBottom={'20px'}
              {...renderProps}
            />
          )}
        />

        <Controller
          control={control}
          name={EExecutorSecondFormFields.gender}
          render={({ field: { ...renderProps } }) => (
            <Input.Gender
              label={t('inputs.gender')}
              mBottom={'20px'}
              {...renderProps}
            />
          )}
        />

        <Controller
          control={control}
          name={EExecutorSecondFormFields.birthday}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              date={new Date(value)}
              setDate={onChange}
              mBottom={'20px'}
              label={t('inputs.birthday')}
              error={errors.birthday?.message}
            />
          )}
        />
        <Controller
          control={control}
          name={EExecutorSecondFormFields.location}
          render={({ field: { onChange: onChangeLocation } }) => (
            <>
              <Controller
                control={control}
                name={EExecutorSecondFormFields.country}
                render={({ field: { onChange, value } }) => (
                  <Input.GooglePlaces
                    onSelect={(address, coords) => {
                      onChange(address)
                      if (coords) {
                        onChangeLocation([coords.lng, coords.lat])
                      }
                    }}
                    value={value}
                    error={errors.country?.message}
                    label={t('inputs.country')}
                  />
                )}
              />
            </>
          )}
        />
      </FlexWrapper>
    )
  },
)

const styles = StyleSheet.create({
  main: {
    paddingVertical: 18,
  },
})
