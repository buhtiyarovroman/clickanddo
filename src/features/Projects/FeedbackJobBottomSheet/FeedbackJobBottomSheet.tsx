import React, { forwardRef, useContext } from 'react'

import { TFeedbackJobBottomSheetProps, TFeedbackJobField, TForm } from './types'
import { useTranslation } from 'react-i18next'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { feedbackJobValidation } from './validation'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { LoaderContext } from '@/app/contexts/Loader'
import { ProjectsService } from '@/entities/Projects/services'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import Toast from 'react-native-toast-message'
import { EToastType } from '@/app/contexts/Toast/types'
import { Container } from './styled'
import { Background } from '@/shared/ui/background'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const FeedbackJobBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TFeedbackJobBottomSheetProps
>(({ onClose = () => {}, onRefresh = () => {}, _id }, ref) => {
  const { t } = useTranslation()
  const { setLoading, loader } = useContext(LoaderContext)
  const { user, setting } = useTypedSelector(getUserSelector)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: zodResolver(feedbackJobValidation),
    defaultValues: {
      [TFeedbackJobField.title]: '',
      [TFeedbackJobField.description]: '',
      [TFeedbackJobField.currency]: setting.currency,
      [TFeedbackJobField.price]: 0,
    },
  })

  const onPress = async (data: TForm) => {
    if (!user) {
      console.error('no user')
      return
    }

    try {
      setLoading(true)

      await ProjectsService.postProjectResponse({
        id: _id,
        specialist: user._id,
        name: user.name,
        secondName: user.secondName,
        photo: user.photo,
        ...data,
      })

      Toast.show({
        type: EToastType.success,
        text2: t('toasts.response_sended'),
      })

      onRefresh()

      onClose()
    } catch (err) {
      console.log('feedbackJob error =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BottomSheet.Base snapPoints={['70%']} ref={ref}>
      <Container>
        <Background.Scroll extraHeight={70}>
          <Controller
            control={control}
            name={TFeedbackJobField.title}
            render={({ field: { ...renderProps } }) => (
              <Input.Standard
                label={t('short_name_offer')}
                error={errors.title?.message}
                mBottom={'20px'}
                {...renderProps}
              />
            )}
          />

          <Controller
            control={control}
            name={TFeedbackJobField.description}
            render={({ field: { value, onChange } }) => (
              <>
                <Input.TextArea
                  showTextLimit
                  placeholder={t('write_your_experience')}
                  error={errors.description?.message}
                  value={value}
                  onChange={onChange}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name={TFeedbackJobField.price}
            render={({
              field: { value: valueBudget, onChange: onBudgetChange },
            }) => (
              <>
                <Controller
                  control={control}
                  name={TFeedbackJobField.currency}
                  render={({
                    field: { value: valueCurrency, onChange: onCurrencyChange },
                  }) => (
                    <Input.Currency
                      mBottom={'16px'}
                      value={valueBudget + ''}
                      currency={valueCurrency}
                      onChangeCurrency={onCurrencyChange}
                      onChangeInput={value => onBudgetChange(+value)}
                    />
                  )}
                />
              </>
            )}
          />

          <Button.Standard
            text={t('send')}
            disabled={loader}
            onPress={handleSubmit(onPress)}
          />
        </Background.Scroll>
      </Container>
    </BottomSheet.Base>
  )
})
