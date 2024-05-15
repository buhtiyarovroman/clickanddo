import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/shared/ui/input'
import { FlexWrapper, H3SemiBold, LRegular } from '@/shared/ui/Styled/Styled'
import { createSkillBoxFourthValidation } from './validation'
import { styles } from '../styles'
import {
  ESkillBoxCreateFourthFormFields,
  TForm,
  TSkillBoxCreateFourthFormRef,
  TSkillBoxFourthFormProps,
} from './types'
import { useTypedSelector } from '@/app/store'
import { getSkillBoxSelector } from '@/entities/Skillbox'

export const FourthForm = forwardRef<
  TSkillBoxCreateFourthFormRef,
  TSkillBoxFourthFormProps
>(({ onChangeValid = () => {} }, ref) => {
  const { t } = useTranslation()
  const { createSkillBox } = useTypedSelector(getSkillBoxSelector)
  const [totalPrice, setTotalPrice] = useState(0)
  const [negotiatedPrice, setNegotiatedPrice] = useState(false)
  const {
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createSkillBoxFourthValidation),
    defaultValues: {
      initialPrice: +createSkillBox.initialPrice.toFixed(0),
      discount: Number(createSkillBox.discount || '0'),
      priceAfterDiscount: createSkillBox.priceAfterDiscount,
      currency: createSkillBox.currency || 'UAH',
    },
  })

  useImperativeHandle(ref, () => ({
    getForm: async () => {
      const isFormValid = await trigger()
      if (!isFormValid) return null

      return getValues()
    },
  }))

  const getTotalPrice = () => {
    const initPrice = getValues().initialPrice
    const discount = getValues().discount
    const updatedTotalPrice = discount
      ? Number(Number(initPrice - initPrice * (discount / 100)).toFixed(2))
      : Number(initPrice)
    setTotalPrice(updatedTotalPrice)
  }

  const onCheckboxPress = () => {
    setNegotiatedPrice(prev => !prev)
    if (!negotiatedPrice) {
      setValue(ESkillBoxCreateFourthFormFields.initialPrice, 0)
      setValue(ESkillBoxCreateFourthFormFields.discount, 0)
    }
    getTotalPrice()
  }

  useEffect(() => {
    getTotalPrice()
  }, [])

  useEffect(() => {
    setValue(ESkillBoxCreateFourthFormFields.priceAfterDiscount, totalPrice)
    setValue(ESkillBoxCreateFourthFormFields.totalPrice, totalPrice)
  }, [totalPrice])

  useEffect(() => {
    onChangeValid(isValid)
  }, [isValid, onChangeValid])
  console.log(errors)
  return (
    <>
      <View style={{ ...styles.section, ...styles.section_first }}>
        <H3SemiBold mBottom="16px">{t('set_price')}</H3SemiBold>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Controller
              control={control}
              render={({
                field: { onChange: onChangeInput, value: valueInput },
              }) => (
                <Input.Currency
                  disabled={negotiatedPrice}
                  mBottom="16px"
                  error={errors.initialPrice?.message}
                  currency={value}
                  label={t('initial_price')}
                  onChangeCurrency={onChange}
                  onChangeInput={budget => {
                    onChangeInput(+budget)
                    getTotalPrice()
                  }}
                  value={valueInput + ''}
                />
              )}
              name={'initialPrice'}
            />
          )}
          name={'currency'}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => {
            console.log(typeof value)
            return (
              <Input.Standard
                disabled={negotiatedPrice}
                mBottom="16px"
                keyboardType="number-pad"
                label={t('discount')}
                value={`${value}`}
                onChange={e => {
                  onChange(Number(e))
                  getTotalPrice()
                }}
                error={errors.discount?.message}
              />
            )
          }}
          name={ESkillBoxCreateFourthFormFields.discount}
        />
        <Controller
          control={control}
          render={({ field: { value: currency } }) => (
            <Controller
              control={control}
              render={() => (
                <Input.Currency
                  currency={currency}
                  disabled
                  label={t('total_price')}
                  value={`${totalPrice}`}
                  error={errors.priceAfterDiscount?.message}
                />
              )}
              name={'totalPrice'}
            />
          )}
          name={'currency'}
        />

        <FlexWrapper mTop="16px" justify="flex-start">
          <Input.Checkbox value={negotiatedPrice} onChange={onCheckboxPress} />
          <LRegular mLeft="16px">{t('price_negotiable')}</LRegular>
        </FlexWrapper>
      </View>
    </>
  )
})
