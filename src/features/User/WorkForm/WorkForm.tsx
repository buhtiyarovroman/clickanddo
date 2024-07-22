import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useTranslation } from 'react-i18next'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useFieldArray, useForm } from 'react-hook-form'

import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'

import { TForm } from './types'
import { createWorkValid } from './validation'
import { EEducationFormFields, TWorkFormProps, TWorkFormRef } from './types'
import { View } from 'react-native'

export const WorkForm = forwardRef<TWorkFormRef, TWorkFormProps>(
  ({ isEdit = false }, ref) => {
    const { t } = useTranslation()
    const { user } = useTypedSelector(getUserSelector)

    const defaultData = {
      id: uuidv4(),
      nameOfCompany: '',
      companyLocation: '',
      from: '',
      to: '',
    }

    const defaultValues = isEdit
      ? user?.work.length
        ? user?.work.map(item => ({
            id: uuidv4(),
            nameOfCompany: item.name,
            companyLocation: item.location,
            from: item.from,
            to: item.to,
          }))
        : [defaultData]
      : [defaultData]

    const {
      control,
      getValues,
      trigger,
      formState: { errors },
    } = useForm<TForm>({
      resolver: zodResolver(createWorkValid),
      defaultValues: {
        [EEducationFormFields.works]: defaultValues,
      },
    })

    const [stillWork, setStillWork] = useState(false)

    const { fields, append, remove } = useFieldArray({
      control,
      name: EEducationFormFields.works,
    })

    const onAddLang = () => {
      append({
        ...defaultData,
        id: uuidv4(),
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
      <>
        {fields.map((el, index) => (
          <View key={el.id}>
            {/* Title and delete button */}
            <FlexWrapper
              mTop={'16px'}
              mBottom={'10px'}
              justify={'space-between'}>
              <MRegular>
                {t('work')} {index + 1}
              </MRegular>

              {fields.length > 1 && (
                <Button.IconButton
                  onPress={() => remove(index)}
                  icon={'Delete'}
                />
              )}
            </FlexWrapper>

            {/* input name_institution */}
            <H3SemiBold mBottom={'16px'}>{t('company_you_work')}</H3SemiBold>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.Standard
                  label={t('company_name')}
                  value={value}
                  onChange={onChange}
                  mBottom={'16px'}
                  error={errors.works?.[index]?.nameOfCompany?.message}
                />
              )}
              name={`${EEducationFormFields.works}.${index}.nameOfCompany`}
            />

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input.GooglePlaces
                  label={t('select_location')}
                  leftIcon={'LocationPoint'}
                  onSelect={address => onChange(address)}
                  value={value}
                  error={errors.works?.[index]?.companyLocation?.message}
                />
              )}
              name={`${EEducationFormFields.works}.${index}.companyLocation`}
            />

            <H3SemiBold mBottom={'16px'} mTop={'24px'}>
              {t('period_work_in_company')}
            </H3SemiBold>

            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Controller
                    control={control}
                    render={({
                      field: { onChange: onChangeTo, value: valueTo },
                    }) => (
                      <>
                        <FlexWrapper justify={'space-between'}>
                          <Input.TouchableDatePicker
                            width={'47%'}
                            date={value}
                            setDate={date => {
                              onChange(date)
                              onChangeTo('')
                            }}
                            label={t('from')}
                            error={errors.works?.[index]?.from?.message}
                          />

                          <Input.TouchableDatePicker
                            width={'47%'}
                            date={valueTo}
                            setDate={onChangeTo}
                            label={t('to')}
                            disabled={stillWork || !value}
                            minimumDate={!!value ? new Date(value) : undefined}
                            error={errors.works?.[index]?.to?.message}
                          />
                        </FlexWrapper>
                        <FlexWrapper justify={'flex-start'}>
                          <Input.Checkbox
                            size={24}
                            value={stillWork}
                            onChange={stillWorkValue => {
                              setStillWork(stillWorkValue)
                              stillWorkValue && onChangeTo('')
                            }}
                          />
                          <MRegular color={EColors.grey_600} mLeft={'12px'}>
                            {t('still_working')}
                          </MRegular>
                        </FlexWrapper>
                      </>
                    )}
                    name={`${EEducationFormFields.works}.${index}.to`}
                  />
                </>
              )}
              name={`${EEducationFormFields.works}.${index}.from`}
            />
          </View>
        ))}

        <Button.Standard mTop={'16px'} text={t('add')} onPress={onAddLang} />
      </>
    )
  },
)
