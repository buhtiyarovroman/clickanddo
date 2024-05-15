import React, { forwardRef, useEffect, useImperativeHandle } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EProjectCreateFirstFormFields,
  TProjectsCreateFirstFormProps,
  TProjectsCreateFirstFormRef,
} from './types'
import { createProjectFirstValidation } from './validation'
import { TForm } from './types'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import {
  FlexWrapper,
  H3SemiBold,
  LSemibold,
  MRegular,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Dot } from './styled'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'

export const FirstForm = forwardRef<
  TProjectsCreateFirstFormRef,
  TProjectsCreateFirstFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const {
    control,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createProjectFirstValidation),
    defaultValues: {
      name: createProjects.name,
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
      <H3SemiBold mBottom={'24px'}>{t('come_up_project_name')}</H3SemiBold>
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
        name={EProjectCreateFirstFormFields.name}
      />

      <LSemibold mTop={'28px'} mBottom={'12px'}>
        {t('examples_names')}
      </LSemibold>

      <FlexWrapper mBottom={'8px'} justify={'flex-start'}>
        <Dot mRight={'12px'} />

        <MRegular>{t('examples_names_1')}</MRegular>
      </FlexWrapper>

      <FlexWrapper mBottom={'8px'} justify={'flex-start'}>
        <Dot mRight={'12px'} />

        <MRegular>{t('examples_names_2')}</MRegular>
      </FlexWrapper>

      <FlexWrapper mBottom={'8px'} justify={'flex-start'}>
        <Dot mRight={'12px'} />

        <MRegular>{t('examples_names_3')}</MRegular>
      </FlexWrapper>
    </>
  )
})
