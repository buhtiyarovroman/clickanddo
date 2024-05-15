import React, { forwardRef, useContext } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EReviewOfSpecialistFormFields } from './types'
import { createReviewOfSpecialistValidation } from './validation'
import { TForm, TReviewOfSpecialistBottomSheetProps } from './types'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { RatingTitle } from './components'
import { Container } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { TouchableOpacity } from 'react-native'
import { Button } from '@/shared/ui/button'
import { LoaderContext } from '@/app/contexts/Loader'
import { UserService } from '@/entities/User/services'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const ReviewOfSpecialist = forwardRef<
  TBottomSheetBaseRef,
  TReviewOfSpecialistBottomSheetProps
>(({ onClose = () => {}, specialist, project, onRefresh = () => {} }, ref) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TForm>({
    resolver: zodResolver(createReviewOfSpecialistValidation),
    defaultValues: {
      [EReviewOfSpecialistFormFields.price]: 0,
      [EReviewOfSpecialistFormFields.professionalism]: 0,
      [EReviewOfSpecialistFormFields.cost]: 0,
      [EReviewOfSpecialistFormFields.contactability]: 0,
      [EReviewOfSpecialistFormFields.timing]: 0,
      [EReviewOfSpecialistFormFields.title]: '',
      [EReviewOfSpecialistFormFields.text]: '',
    },
  })

  const onSendReview = async (data: TForm) => {
    if (!project || !specialist) {
      console.error('no have project || specialist')
      return
    }

    try {
      setLoading(true)
      let { price, contactability, cost, timing, professionalism } = data

      await UserService.postReview({
        title: data.title,
        description: data.text,
        to: specialist,
        project: project,
        mark: {
          ...{ price, contactability, cost, timing, professionalism },
        },
      })

      onRefresh()
      onClose()
    } catch (err) {
      console.log('onSendReview of Specialist err =>', err)
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
              <RatingTitle
                title={t('quality')}
                error={errors.price?.message}
                {...{ value, onChange }}
              />
            )}
            name={EReviewOfSpecialistFormFields.price}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <RatingTitle
                title={t('professionalism')}
                error={errors.professionalism?.message}
                {...{ value, onChange }}
              />
            )}
            name={EReviewOfSpecialistFormFields.professionalism}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <RatingTitle title={t('cost')} {...{ value, onChange }} />
            )}
            name={EReviewOfSpecialistFormFields.cost}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <RatingTitle
                title={t('contactability')}
                error={errors.contactability?.message}
                {...{ value, onChange }}
              />
            )}
            name={EReviewOfSpecialistFormFields.contactability}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <RatingTitle
                title={t('deadlines')}
                error={errors.timing?.message}
                {...{ value, onChange }}
              />
            )}
            name={EReviewOfSpecialistFormFields.timing}
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
            name={EReviewOfSpecialistFormFields.title}
          />

          <Controller
            control={control}
            render={({ field: { value, onChange } }) => (
              <>
                <Input.TextArea
                  label={t('text_review')}
                  showTextLimit
                  error={errors.text?.message}
                  {...{ value, onChange }}
                />
              </>
            )}
            name={EReviewOfSpecialistFormFields.text}
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
