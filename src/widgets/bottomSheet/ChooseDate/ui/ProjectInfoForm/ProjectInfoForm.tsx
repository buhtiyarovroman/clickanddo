import React, { useImperativeHandle, forwardRef } from 'react'

import { Container } from './styled'
import { FlexWrapper, MRegular, SRegular } from '@/shared/ui/Styled/Styled'
import { TProjectInfoFormRef, TProjectInfoFormProps, TForm } from './types'
import { Input } from '@/shared/ui/input'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProjectInfoFormValidation } from './validation'
import { EColors } from '@/shared/ui/Styled'
import { AndroidSoftInputModes } from 'react-native-keyboard-controller'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const ProjectInfoForm = forwardRef<
  TProjectInfoFormRef,
  TProjectInfoFormProps
>(({}, ref) => {
  const { t } = useTranslation()
  const { setting } = useTypedSelector(getUserSelector)
  const {
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(createProjectInfoFormValidation),
    defaultValues: {
      name: '',
      address: '',
      location: [],
      currency: setting.currency,
      budget: 0,
    },
  })

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  return (
    <Container>
      {/* Project Name  */}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Input.Standard
              label={t('project_name')}
              value={value}
              maxLength={100}
              onChange={onChange}
              error={errors.name?.message}
            />
            <FlexWrapper justify={'flex-end'}>
              <SRegular color={EColors.grey_500}>{value.length}/100</SRegular>
            </FlexWrapper>
          </>
        )}
        name={'name'}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Input.TextArea
              placeholder={t('add_description_in_task')}
              value={value}
              limit={3000}
              showTextLimit
              onChange={onChange}
              error={errors.description?.message}
            />
          </>
        )}
        name={'description'}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Controller
            control={control}
            render={({
              field: { onChange: onChangeInput, value: valueInput },
            }) => (
              <>
                <MRegular mBottom={'10px'}>{t('project_budget')}</MRegular>
                <Input.Currency
                  error={errors.budget?.message}
                  currency={value}
                  onChangeCurrency={onChange}
                  onChangeInput={budget => {
                    onChangeInput(+budget)
                  }}
                  value={valueInput + ''}
                  mBottom={'16px'}
                  inputMode={AndroidSoftInputModes.SOFT_INPUT_ADJUST_NOTHING}
                />
              </>
            )}
            name={'budget'}
          />
        )}
        name={'currency'}
      />

      <Controller
        control={control}
        render={({ field: { value, onChange: addressChange } }) => (
          <>
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <>
                  <Input.GooglePlaces
                    disableFormatted
                    value={value}
                    onSelect={(address, cords) => {
                      if (!cords) onChange([])

                      if (cords) onChange([cords?.lng, cords?.lat])
                      addressChange(address)
                    }}
                    label={t('enter_address')}
                  />
                </>
              )}
              name={'location'}
            />
          </>
        )}
        name={'address'}
      />
    </Container>
  )
})
