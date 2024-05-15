import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'

import { Input } from '@/shared/ui/input'
import { FlexWrapper, H3SemiBold } from '@/shared/ui/Styled/Styled'

import { Hashtags } from '../Hashtags'
import { TForm, EThirdRomFiled } from './types'
import { createProjectThirdValidation } from './validation'
import { TProjectsThirdFormProps, TProjectsThirdFormRef } from './types'

export const ThirdForm = forwardRef<
  TProjectsThirdFormRef,
  TProjectsThirdFormProps
>(({ onChangeValid = () => {}, pBottom = 0 }, ref) => {
  const { t } = useTranslation()
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const {
    control,
    getValues,
    trigger,
    setError,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createProjectThirdValidation),
    defaultValues: {
      [EThirdRomFiled.name]: createProjects.additionalService.name,
      [EThirdRomFiled.hashtag]: createProjects.additionalService.hashtag,
      [EThirdRomFiled.description]:
        createProjects.additionalService.description,
    },
  })

  useEffect(() => {
    onChangeValid(isValid)
  }, [isValid, onChangeValid])

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null
      const data = getValues()
      if (data.name || data.description || data.hashtag?.length) {
        if (!data.name) {
          setError(EThirdRomFiled.name, {
            message: t('validation_error.no_empty'),
          })

          return null
        }

        if (!data.description) {
          setError(EThirdRomFiled.description, {
            message: t('validation_error.no_empty'),
          })

          return null
        }

        if (!data.hashtag?.length) {
          setError(EThirdRomFiled.hashtag, {
            message: t('validation_error.no_empty'),
          })

          return null
        }
      }

      return getValues()
    },
  }))

  return (
    <>
      <FlexWrapper
        flexDirection={'column'}
        align={'flex-start'}
        mBottom={`${pBottom + 48}px`}>
        <H3SemiBold mBottom={'16px'}>
          {t('select_additional_service')}
        </H3SemiBold>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Standard
              value={value}
              onChange={onChange}
              label={t('name_of_service')}
              mBottom={'16px'}
            />
          )}
          name={EThirdRomFiled.name}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Hashtags
              error={errors.hashtag?.message}
              hashtag={value}
              onChange={onChange}
              limit={5}
            />
          )}
          name={EThirdRomFiled.hashtag}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Input.TextArea
                mTop={'16px'}
                label={t('add_description_in_task')}
                value={value}
                limit={3000}
                showTextLimit
                onChange={onChange}
                error={errors.description?.message}
              />
            </>
          )}
          name={EThirdRomFiled.description}
        />
      </FlexWrapper>
    </>
  )
})
