import React, { forwardRef, useEffect, useImperativeHandle } from 'react'
import { SelectLang } from '../SelectLang'
import { SelectType } from '../SelectType'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuidv4 } from 'uuid'
import {
  EChangeLangFormFields,
  TChangeLangFormProps,
  TChangeLangFormRef,
} from './types'
import { createChangeLanguagesValid } from './validation'
import { TForm } from './types'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { View } from 'react-native'
import { styles } from './styles'
import { localLanguages } from './data'

export const ChangeLanguages = forwardRef<
  TChangeLangFormRef,
  TChangeLangFormProps
>(({ isEdit }, ref) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)

  const defaultObj = {
    id: uuidv4(),
    lang: '',
    level: 0,
  }

  const defaultValue = isEdit
    ? user?.languages.length
      ? user?.languages.map(item => ({
          id: uuidv4(),
          ...item,
        }))
      : [defaultObj]
    : [defaultObj]

  const {
    control,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(createChangeLanguagesValid),
    defaultValues: {
      [EChangeLangFormFields.lang]: defaultValue,
    },
  })

  useEffect(() => {}, [])

  const languages = watch().lang.map(el => el.lang)

  const currentLanguages = localLanguages.filter(el => !languages.includes(el))

  const { fields, append, remove } = useFieldArray({
    control,
    name: EChangeLangFormFields.lang,
  })

  const onAddLang = () => {
    append({
      id: uuidv4(),
      lang: '',
      level: 0,
    })
  }

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  return (
    <View style={styles.main}>
      {fields.map((el, index) => {
        return (
          <Animated.View
            entering={SlideInRight.duration(500)}
            exiting={SlideOutLeft.duration(500)}
            key={el.id}>
            <FlexWrapper
              mTop={'16px'}
              mBottom={'10px'}
              justify={'space-between'}>
              <MRegular>
                {t('language')} {index + 1}
              </MRegular>

              {fields.length > 1 && (
                <Button.IconButton
                  onPress={() => remove(index)}
                  icon={'Delete'}
                />
              )}
            </FlexWrapper>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectLang
                  value={value}
                  onChange={onChange}
                  error={errors.lang?.[index]?.lang?.message}
                  languages={currentLanguages}
                />
              )}
              name={`lang.${index}.lang`}
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectType
                  value={value}
                  onChange={onChange}
                  error={errors.lang?.[index]?.level?.message}
                />
              )}
              name={`lang.${index}.level`}
            />
          </Animated.View>
        )
      })}

      <Button.Standard mTop={'16px'} text={t('add')} onPress={onAddLang} />
    </View>
  )
})
