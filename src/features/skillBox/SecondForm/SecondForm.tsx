import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/shared/ui/input'
import { H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { createSkillBoxSecondValidation } from './validation'
import { styles } from '../styles'
import {
  ESkillBoxCreateSecondFormFields,
  TForm,
  TSkillBoxCreateSecondFormRef,
  TSkillBoxSecondFormProps,
} from './types'
import { useTypedSelector } from '@/app/store'
import { getSkillBoxSelector } from '@/entities/Skillbox'

export const SecondForm = forwardRef<
  TSkillBoxCreateSecondFormRef,
  TSkillBoxSecondFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)

  console.log('data', {
    location: createSkillBox.location,
    locationRange: String(createSkillBox.locationRange),
    address: createSkillBox.address,
  })
  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSkillBoxSecondValidation),
    defaultValues: {
      location: createSkillBox.location,
      locationRange: String(createSkillBox.locationRange),
      address: createSkillBox.address,
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
        <H3SemiBold>{t('select_location')}</H3SemiBold>
        <MRegular mBottom="16px" mTop="16px">
          {t('select_your_location')}
        </MRegular>
        <Controller
          control={control}
          render={({
            field: { value: addressValue, onChange: onChangeAddress },
          }) => (
            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input.GooglePlaces
                  disableFormatted
                  value={addressValue}
                  label={t('select_location')}
                  onSelect={(address, cords) => {
                    if (!cords) onChange([])
                    if (cords) onChange([cords?.lng, cords?.lat])
                    onChangeAddress(address)
                  }}
                  error={errors.location?.message}
                />
              )}
              name={'location'}
            />
          )}
          name={'address'}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input.Standard
              label={t('select_location_range')}
              value={value}
              onChange={onChange}
              error={errors.locationRange?.message}
            />
          )}
          name={'locationRange'}
        />
      </View>
    </>
  )
})
