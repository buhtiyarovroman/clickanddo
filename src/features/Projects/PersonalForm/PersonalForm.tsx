import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  EProjectCreatePersonalFormFields,
  TProjectsCreatePersonalFormProps,
  TProjectsCreatePersonalFormRef,
} from './types'
import { createProjectPersonalFormValidation } from './validation'
import { TForm } from './types'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import {
  FlexWrapper,
  Hr,
  LSemibold,
  MRegular,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'
import { v4 as uuidv4 } from 'uuid'
import { DateTime } from '../FourthForm/components'
import { Touchable } from './styled'
import { Photos } from '@/shared/ui/Photos'
import { AndroidSoftInputModes } from 'react-native-keyboard-controller'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { getUserSelector } from '@/entities/User'

export const PersonalForm = forwardRef<
  TProjectsCreatePersonalFormRef,
  TProjectsCreatePersonalFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const { setting } = useTypedSelector(getUserSelector)
  const [isRemote, setIsRemote] = useState(false)
  const [quick, setQuick] = useState(true)

  const {
    control,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createProjectPersonalFormValidation),
    defaultValues: {
      [EProjectCreatePersonalFormFields.name]: createProjects.name,
      [EProjectCreatePersonalFormFields.description]:
        createProjects.description,
      [EProjectCreatePersonalFormFields.address]: createProjects.address || '',
      [EProjectCreatePersonalFormFields.location]:
        createProjects.location?.coordinates || [],
      [EProjectCreatePersonalFormFields.images]: false
        ? createProjects.images.map(item => ({ path: item, id: uuidv4() }))
        : [],
      [EProjectCreatePersonalFormFields.startDate]: createProjects.startDate,
      [EProjectCreatePersonalFormFields.budget]: createProjects.budget,
      [EProjectCreatePersonalFormFields.currency]:
        (setting.currency as TCurrencyValue) || 'UAH',
    },
  })

  console.log('errors =>', errors)

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
        render={({ field: { onChange, value } }) => (
          <>
            <Input.Standard
              label={t('short_name_project')}
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
        name={EProjectCreatePersonalFormFields.name}
      />

      <Hr color={EColors.grey_200} mTop={'18px'} mBottom={'18px'} />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <LSemibold mBottom={'16px'}>
              {t('add_description_in_task')}
            </LSemibold>
            <Input.TextArea
              placeholder={t('offer.description_placeholder')}
              value={value}
              limit={3000}
              showTextLimit
              onChange={onChange}
              error={errors.description?.message}
            />
          </>
        )}
        name={EProjectCreatePersonalFormFields.description}
      />

      <Hr color={EColors.grey_200} mTop={'18px'} mBottom={'18px'} />

      <Controller
        control={control}
        render={({ field: { value, onChange: addressChange } }) => (
          <>
            <LSemibold mBottom={'16px'}>{t('location')}</LSemibold>

            <Controller
              control={control}
              render={({ field: { onChange } }) => (
                <Input.GooglePlaces
                  disableFormatted
                  value={value}
                  onSelect={(address, cords) => {
                    if (!cords) onChange([])

                    if (cords) onChange([cords?.lng, cords?.lat])
                    addressChange(address)
                  }}
                  label={t('enter_address')}
                  disabled={isRemote}
                />
              )}
              name={EProjectCreatePersonalFormFields.location}
            />
          </>
        )}
        name={EProjectCreatePersonalFormFields.address}
      />

      <FlexWrapper mBottom={'16px'} justify={'flex-start'}>
        <Input.Checkbox value={isRemote} onChange={setIsRemote} />
        <MRegular mLeft={'12px'}>{t('remote_work')}</MRegular>
      </FlexWrapper>

      <Hr color={EColors.grey_200} mTop={'18px'} mBottom={'18px'} />

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
        name={EProjectCreatePersonalFormFields.images}
      />

      <Hr color={EColors.grey_200} mTop={'18px'} mBottom={'18px'} />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <LSemibold mBottom={'16px'}>{t('start_date_project')}</LSemibold>
            <DateTime
              date={value}
              setDate={date => {
                onChange(date), setQuick(false)
              }}
              mBottom={'16px'}
            />

            <Touchable onPress={() => setQuick(!quick)}>
              <Input.Checkbox value={quick} onChange={setQuick} />

              <MRegular mLeft={'10px'}>{t('soon_as_possible')}</MRegular>
            </Touchable>
          </>
        )}
        name={EProjectCreatePersonalFormFields.startDate}
      />

      <Hr color={EColors.grey_200} mTop={'18px'} mBottom={'18px'} />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Controller
            control={control}
            render={({
              field: { onChange: onChangeInput, value: valueInput },
            }) => (
              <>
                <LSemibold mBottom={'16px'}>{t('project_budget')}</LSemibold>
                <Input.Currency
                  error={errors.budget?.message}
                  currency={value}
                  onChangeCurrency={onChange}
                  onChangeInput={budget => {
                    onChangeInput(+budget)
                  }}
                  value={valueInput + ''}
                  inputMode={AndroidSoftInputModes.SOFT_INPUT_ADJUST_NOTHING}
                />
              </>
            )}
            name={EProjectCreatePersonalFormFields.budget}
          />
        )}
        name={EProjectCreatePersonalFormFields.currency}
      />
    </>
  )
})
