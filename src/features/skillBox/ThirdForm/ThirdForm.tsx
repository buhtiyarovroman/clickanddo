import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/shared/ui/input'
import { H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { createSkillBoxThirdValidation } from './validation'
import { styles } from '../styles'
import {
  TForm,
  TSkillBoxCreateThirdFormRef,
  TSkillBoxThirdFormProps,
} from './types'

import { Hashtags } from '@/features/Projects/Hashtags'
import { useTypedSelector } from '@/app/store'
import { getSkillBoxSelector } from '@/entities/Skillbox'

export const ThirdForm = forwardRef<
  TSkillBoxCreateThirdFormRef,
  TSkillBoxThirdFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)
  const {
    control,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSkillBoxThirdValidation),
    defaultValues: {
      description: createSkillBox.description,
      duration: createSkillBox.duration,
    },
  })

  useImperativeHandle(ref, () => ({
    getForm: async () => {
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
        <H3SemiBold>{t('describe_workflow')}</H3SemiBold>
        <MRegular mBottom="16px" mTop="16px">
          {t('describe_workflow_description')}
        </MRegular>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.TextArea
              showTextLimit
              limit={1500}
              placeholder={t('add_description_placeholder')}
              onChange={onChange}
              value={value}
              error={errors.description?.message}
            />
          )}
          name={'description'}
        />
      </View>
      <View style={styles.section}>
        <H3SemiBold mBottom="16px">{t('duration_process')}</H3SemiBold>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Standard
              keyboardType="number-pad"
              value={value}
              label={t('set_duration')}
              onChange={onChange}
              error={errors.duration?.message}
            />
          )}
          name={'duration'}
        />
      </View>
    </>
  )
})
