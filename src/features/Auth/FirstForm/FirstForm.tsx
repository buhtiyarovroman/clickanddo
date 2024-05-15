import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  EExecutorFirstFormFields,
  TForm,
  TExecutorFormProps,
  TExecutorFormRef,
} from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { executorFirstValidation } from './validation'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'
import { TPhoneInputRef } from '@/shared/ui/input/Phone/types'

export const FirstForm = forwardRef<TExecutorFormRef, TExecutorFormProps>(
  ({ onChangeValid = () => {} }, ref) => {
    const { t } = useTranslation()
    const phoneRef = useRef<TPhoneInputRef | null>(null)

    const {
      control,
      getValues,
      trigger,
      watch,
      formState: { errors, isValid, isDirty },
    } = useForm<TForm>({
      resolver: zodResolver(executorFirstValidation),
      defaultValues: {
        [EExecutorFirstFormFields.phone]: '',
        [EExecutorFirstFormFields.email]: '',
        [EExecutorFirstFormFields.password]: '',
      },
    })

    useEffect(() => {
      const subscription = watch(() => {
        onChangeValid(!isDirty && isValid)
        trigger()
      })

      return () => subscription.unsubscribe()
    }, [watch, isDirty, isValid, onChangeValid, trigger])

    useImperativeHandle(ref, () => ({
      getForm: async () => {
        const phoneInfo = phoneRef.current?.getPhoneInfo()
        const isFormValid = await trigger()
        if (!isFormValid) return null

        if (!phoneInfo?.countryCode) {
          console.error('countryCode is undefined ')
          return null
        }

        const data = getValues()
        return { ...data, countryCode: phoneInfo.countryCode }
      },
    }))

    return (
      <FlexWrapper flexDirection={'column'} style={styles.main}>
        <Controller
          control={control}
          name={EExecutorFirstFormFields.email}
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
          name={EExecutorFirstFormFields.password}
          render={({ field: { ...renderProps } }) => (
            <Input.Password
              label={t('inputs.password')}
              error={errors.password?.message}
              mBottom={'20px'}
              {...renderProps}
            />
          )}
        />

        <Controller
          control={control}
          name={EExecutorFirstFormFields.phone}
          render={({ field: { ...renderProps } }) => (
            <Input.Phone
              label={t('inputs.phone_title')}
              error={errors.phone?.message}
              mBottom={'20px'}
              {...renderProps}
              ref={phoneRef}
            />
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
