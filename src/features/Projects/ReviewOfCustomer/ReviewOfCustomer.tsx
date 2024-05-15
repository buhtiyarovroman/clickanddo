import React, { forwardRef, useContext } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EReviewOfCustomerFormFields } from './types'
import { createReviewOfCustomerValidation } from './validation'
import { TForm, TReviewOfCustomerBottomSheetProps } from './types'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { Container } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity } from 'react-native'
import { Button } from '@/shared/ui/button'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const ReviewOfCustomer = forwardRef<
  TBottomSheetBaseRef,
  TReviewOfCustomerBottomSheetProps
>(({ onClose = () => {}, customer, project, onRefresh = () => {} }, ref) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createReviewOfCustomerValidation),
    defaultValues: {
      [EReviewOfCustomerFormFields.mark]: 0,
      [EReviewOfCustomerFormFields.title]: '',
      [EReviewOfCustomerFormFields.description]: '',
    },
  })

  const onSendReview = async (data: TForm) => {
    if (!project || !customer) {
      console.error('no have project || customer')
      return
    }

    try {
      setLoading(true)
      let { mark } = data

      await UserService.postReview({
        title: data.title,
        description: data.description,
        to: customer,
        project: project,
        mark: {
          mark: mark,
        },
      })

      onRefresh()
      reset()
      onClose()
    } catch (err) {
      console.log('onSendReview of Customer err =>', err)
    } finally {
      setLoading(false)
    }
  }

  const _onClose = () => {
    reset()
    onClose()
  }

  return (
    <BottomSheet.Base snapPoints={['80%']} ref={ref}>
      <FlexWrapper>
        <Container>
          <FlexWrapper mBottom={'24px'} justify={'space-between'}>
            <H3SemiBold>{t('leave_review')}</H3SemiBold>

            <TouchableOpacity activeOpacity={0.8} onPress={_onClose}>
              <MRegular color={EColors.grey_600}>{t('cancel')}</MRegular>
            </TouchableOpacity>
          </FlexWrapper>

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input.Rating size={28} mStar={'12px'} {...{ value, onChange }} />
            )}
            name={EReviewOfCustomerFormFields.mark}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input.Standard
                mTop={'10px'}
                mBottom={'20px'}
                label={t('title_review')}
                error={errors.title?.message}
                {...{ value, onChange }}
              />
            )}
            name={EReviewOfCustomerFormFields.title}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input.TextArea
                  label={t('text_review')}
                  showTextLimit
                  error={errors.description?.message}
                  {...{ value, onChange }}
                />
              </>
            )}
            name={EReviewOfCustomerFormFields.description}
          />

          <Button.Standard
            disabled={!isValid}
            mTop={'30px'}
            text={t('leave_review')}
            onPress={handleSubmit(onSendReview)}
          />
        </Container>
      </FlexWrapper>
    </BottomSheet.Base>
  )
})
