import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TProjectsSecondFormProps, TProjectsSecondFormRef } from './types'
import { createProjectFirstValidation } from './validation'
import { TForm } from './types'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { H3SemiBold } from '@/shared/ui/Styled/Styled'
import { Hashtags } from '../Hashtags'
import { View } from 'react-native'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'
import { Photos } from '@/shared/ui/Photos'

export const SecondForm = forwardRef<
  TProjectsSecondFormRef,
  TProjectsSecondFormProps
>(({ onChangeValid = () => {}, pBottom, isEdit }, ref) => {
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
      description: createProjects.description,
      hashtag: createProjects.hashtag,
      images: isEdit
        ? createProjects.images.map(item => ({ path: item, id: uuidv4() }))
        : [],
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
    <View style={{ paddingBottom: pBottom }}>
      <H3SemiBold mBottom={'24px'}>{t('add_description_in_task')}</H3SemiBold>
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
          <Hashtags hashtag={value} onChange={onChange} limit={5} />
        )}
        name={'hashtag'}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Photos
            photos={value}
            onChange={onChange}
            imageType={'project'}
            multiple
            maxFiles={20}
            mBottom={'20px'}
          />
        )}
        name={'images'}
      />
    </View>
  )
})
