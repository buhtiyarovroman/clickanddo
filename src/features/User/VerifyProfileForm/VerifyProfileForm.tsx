import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EChangeLangFormFields,
  TVerifyProfileFormProps,
  TVerifyProfileFormRef,
} from './types'
import { createVerifyProfileLanguagesValid } from './validation'
import { TForm } from './types'
import { Trans, useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { PassportPhoto } from './comnponents'
import { StyleSheet, Switch } from 'react-native'
import { EColors } from '@/shared/ui/Styled'

export const VerifyProfileForm = forwardRef<
  TVerifyProfileFormRef,
  TVerifyProfileFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()

  const {
    control,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createVerifyProfileLanguagesValid),
    defaultValues: {
      [EChangeLangFormFields.series]: '',
      [EChangeLangFormFields.no]: '',
      [EChangeLangFormFields.id]: '',
      [EChangeLangFormFields.photo]: '',
      [EChangeLangFormFields.agree]: false,
    },
  })

  useEffect(() => {
    onChangeValid(isValid)
  }, [isValid, onChangeValid])

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  return (
    <>
      <Controller
        control={control}
        name={EChangeLangFormFields.series}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('series')}
            error={errors.series?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EChangeLangFormFields.no}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('number')}
            error={errors.no?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EChangeLangFormFields.id}
        render={({ field: { ...renderProps } }) => (
          <Input.Standard
            label={t('id')}
            error={errors.id?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <LSemibold mBottom={'20px'}>{t('photo_confirmation')}</LSemibold>

      <Controller
        control={control}
        name={EChangeLangFormFields.photo}
        render={({ field: { ...renderProps } }) => (
          <PassportPhoto
            error={errors.photo?.message}
            mBottom={'20px'}
            {...renderProps}
          />
        )}
      />

      <Controller
        control={control}
        name={EChangeLangFormFields.agree}
        render={({ field: { value, onChange } }) => (
          <FlexWrapper mTop={'16px'} justify={'space-between'}>
            <Switch
              thumbColor={EColors.white}
              onValueChange={onChange}
              trackColor={{
                true: EColors.primary,
              }}
              value={value}
            />

            <SRegular style={styles.text} color={EColors.grey_600}>
              <Trans
                i18nKey={'i_agree_p_t'}
                values={{
                  policy: t('company_policy'),
                  terms: t('terms_personal_data_processing'),
                }}
                components={{ black: <SRegular /> }}
              />
            </SRegular>
          </FlexWrapper>
        )}
      />
    </>
  )
})

const styles = StyleSheet.create({
  text: {
    width: '80%',
  },
})
