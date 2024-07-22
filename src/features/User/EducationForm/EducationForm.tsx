import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { View } from 'react-native'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { MRegular, H3SemiBold, FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

import {
  TEducationFormRef,
  TEducationFormProps,
  EEducationFormFields,
} from './types'
import { TForm } from './types'
import { styles } from './styles'
import { createChangeLanguagesValid } from './validation'

export const EducationForm = forwardRef<TEducationFormRef, TEducationFormProps>(
  ({ isEdit }, ref) => {
    const { t } = useTranslation()
    const { user } = useTypedSelector(getUserSelector)

    const defaultData = {
      id: uuidv4(),
      from: '',
      to: '',
      discipline: '',
      name: '',
      location: '',
    }

    const defaultValues = isEdit
      ? user?.education.length
        ? user?.education.map(item => ({
            id: uuidv4(),
            from: item.from,
            to: item.to ? item.to : '',
            discipline: item.discipline,
            name: item.name,
            location: item.location,
          }))
        : [defaultData]
      : [defaultData]
    const {
      control,
      getValues,
      trigger,
      formState: { errors },
    } = useForm<TForm>({
      resolver: zodResolver(createChangeLanguagesValid),
      defaultValues: {
        [EEducationFormFields.education]: defaultValues,
      },
    })

    const [stillLearning, setStillLearning] = useState(false)

    const { fields, append, remove } = useFieldArray({
      control,
      name: EEducationFormFields.education,
    })

    const onAddLang = () => {
      append({
        id: uuidv4(),
        from: '',
        to: '',
        discipline: '',
        name: '',
        location: '',
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
        {fields.map((el, index) => (
          <View key={el.id}>
            {/* Title and delete button */}
            <FlexWrapper
              mTop={'16px'}
              mBottom={'10px'}
              justify={'space-between'}>
              <MRegular>
                {t('education')} {index + 1}
              </MRegular>

              {fields.length > 1 && (
                <Button.IconButton
                  onPress={() => remove(index)}
                  icon={'Delete'}
                />
              )}
            </FlexWrapper>

            {/* input name_institution */}
            <H3SemiBold mBottom={'16px'}>
              {t('educational_institution')}
            </H3SemiBold>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.Standard
                  label={t('name_institution')}
                  value={value}
                  onChange={onChange}
                  error={errors.education?.[index]?.name?.message}
                  mBottom={'16px'}
                />
              )}
              name={`${EEducationFormFields.education}.${index}.name`}
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.GooglePlaces
                  label={t('select_location')}
                  leftIcon={'LocationPoint'}
                  onSelect={address => onChange(address)}
                  value={value}
                  error={errors.education?.[index]?.location?.message}
                />
              )}
              name={`${EEducationFormFields.education}.${index}.location`}
            />

            {/* select degree */}
            <H3SemiBold mBottom={'16px'}>{t('specialization')}</H3SemiBold>
            <Controller
              control={control}
              render={({ field: { ...renderFiled } }) => (
                <>
                  <Input.Standard
                    {...renderFiled}
                    label={t('enter_specialization')}
                    error={errors.education?.[index]?.discipline?.message}
                    mBottom={'16px'}
                  />
                </>
              )}
              name={`${EEducationFormFields.education}.${index}.discipline`}
            />

            {/* select study period */}
            <H3SemiBold mBottom={'16px'}>{t('study_period')}</H3SemiBold>
            <Controller
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error: errorFrom },
              }) => (
                <>
                  <Controller
                    control={control}
                    render={({
                      field: { onChange: onChangeTo, value: valueTo },
                      fieldState: { error: errorTo },
                    }) => (
                      <>
                        <FlexWrapper justify={'space-between'} mBottom={'16px'}>
                          <Input.TouchableDatePicker
                            width={'47%'}
                            label={t('from')}
                            date={value}
                            setDate={date => {
                              onChange(date)
                              onChangeTo('')
                            }}
                            error={errorFrom?.message}
                          />

                          <Input.TouchableDatePicker
                            width={'47%'}
                            label={t('to')}
                            date={valueTo}
                            disabled={!value}
                            setDate={onChangeTo}
                            minimumDate={!!value ? new Date(value) : undefined}
                            error={errorTo?.message}
                          />
                        </FlexWrapper>

                        <FlexWrapper justify={'flex-start'}>
                          <Input.Checkbox
                            size={24}
                            value={stillLearning}
                            onChange={stillLearningValue => {
                              setStillLearning(stillLearningValue)
                              stillLearningValue && onChangeTo('')
                            }}
                          />
                          <MRegular color={EColors.grey_600} mLeft={'12px'}>
                            {t('still_learning')}
                          </MRegular>
                        </FlexWrapper>
                      </>
                    )}
                    name={`${EEducationFormFields.education}.${index}.to`}
                  />
                </>
              )}
              name={`${EEducationFormFields.education}.${index}.from`}
            />
          </View>
        ))}

        <Button.Standard mTop={'16px'} text={t('add')} onPress={onAddLang} />
      </View>
    )
  },
)
