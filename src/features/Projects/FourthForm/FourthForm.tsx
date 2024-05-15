import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TProjectsFourthFormProps, TProjectsFourthFormRef } from './types'
import { createProjectFourthFormValidation } from './validation'
import { TForm } from './types'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { DateTime } from './components'
import { addDays } from 'date-fns'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'
import { AndroidSoftInputModes } from 'react-native-keyboard-controller'
import { Touchable } from './styled'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'

export const FourthForm = forwardRef<
  TProjectsFourthFormRef,
  TProjectsFourthFormProps
>(({ onChangeValid = () => {}, pBottom = 0 }, ref) => {
  const { t } = useTranslation()
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const [quick, setQuick] = useState(true)
  const {
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createProjectFourthFormValidation),
    defaultValues: {
      address: createProjects.address || '',
      location: createProjects.location?.coordinates || [],
      startDate: createProjects.startDate,
      endDate: createProjects.endDate,
      relevantUntil: addDays(new Date(), 10).toString(),
      currency: (createProjects.currency as TCurrencyValue) || 'UAH',
      budget: createProjects.budget,
    },
  })
  const [isRemote, setIsRemote] = useState(false)

  useEffect(() => {
    onChangeValid(isValid)
  }, [isValid])

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  useEffect(() => {
    quick && setValue('startDate', '')
  }, [quick])

  return (
    <>
      <FlexWrapper
        align={'flex-start'}
        flexDirection={'column'}
        mBottom={`${pBottom * 2}px`}>
        <H3SemiBold mBottom={'16px'}>
          {t('select_additional_service')}
        </H3SemiBold>

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
                    <FlexWrapper mBottom={'16px'} justify={'flex-start'}>
                      <Input.Checkbox
                        value={!value}
                        onChange={() => {
                          addressChange('')
                          onChange([])
                        }}
                      />
                      <MRegular mLeft={'12px'}>{t('remote_work')}</MRegular>
                    </FlexWrapper>
                  </>
                )}
                name={'location'}
              />
            </>
          )}
          name={'address'}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <Controller
                control={control}
                render={({
                  field: { onChange: endOnChange, value: endValue },
                }) => (
                  <>
                    <DateTime
                      title={t('start_date_project')}
                      date={value}
                      setDate={date => {
                        onChange(date), endOnChange('')
                        setQuick(false)
                      }}
                      mBottom={'16px'}
                    />

                    <Touchable onPress={() => setQuick(!quick)}>
                      <Input.Checkbox value={quick} onChange={setQuick} />

                      <MRegular mLeft={'10px'}>
                        {t('soon_as_possible')}
                      </MRegular>
                    </Touchable>

                    <DateTime
                      title={t('end_date_project')}
                      date={endValue}
                      setDate={endOnChange}
                      mBottom={'16px'}
                      defaultDate={
                        value ? addDays(new Date(value), 1) : new Date()
                      }
                      minimumDate={value ? new Date(value) : undefined}
                    />
                  </>
                )}
                name={'endDate'}
              />
            </>
          )}
          name={'startDate'}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <DateTime
              title={t('relevance_date_project')}
              date={value}
              setDate={onChange}
              mBottom={'16px'}
              maximumDate={addDays(new Date(), 10)}
            />
          )}
          name={'relevantUntil'}
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
                    inputMode={AndroidSoftInputModes.SOFT_INPUT_ADJUST_NOTHING}
                  />
                </>
              )}
              name={'budget'}
            />
          )}
          name={'currency'}
        />
      </FlexWrapper>
    </>
  )
})
