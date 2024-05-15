import { ReviewOfSpecialist } from '@/features/Projects/ReviewOfSpecialist'
import { ReviewOfCustomer } from '@/features/Projects/ReviewOfCustomer'

import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TProjectCardButtonsReviewButtonsProps } from './types'
import { ChangeStatus } from '../ChangeStatus'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const ReviewButtons = ({
  _id,
  owner,
  specialist,
  isCustomer = false,
  isDoneStatus = false,
  customerReview,
  specialistReview,
  isProgressStatus = false,
  isMarkDoneStatus = false,
  isPendingSpecialistStatus = false,
  onRefresh = () => {},
}: TProjectCardButtonsReviewButtonsProps) => {
  const { t } = useTranslation()
  const reviewOfSpecialistRef = useRef<TBottomSheetBaseRef | null>(null)
  const reviewOfCustomerRef = useRef<TBottomSheetBaseRef | null>(null)

  const onOpenReviewOfSpecialist = () => {
    reviewOfSpecialistRef.current?.open()
  }

  const onCloseReviewOfSpecialist = () => {
    reviewOfSpecialistRef.current?.close()
  }

  const onOpenReviewOfCustomer = () => {
    reviewOfCustomerRef.current?.open()
  }

  const onCloseReviewOfCustomer = () => {
    reviewOfCustomerRef.current?.close()
  }
  return (
    <>
      {isCustomer && !specialistReview && isDoneStatus && (
        <Button.Standard
          mTop={'16px'}
          color={EColors.black}
          onPress={onOpenReviewOfSpecialist}
          text={t('leave_review')}
        />
      )}

      {!isCustomer && !customerReview && isDoneStatus && (
        <Button.Standard
          mTop={'16px'}
          color={EColors.black}
          onPress={onOpenReviewOfCustomer}
          text={t('leave_review')}
        />
      )}

      {/* Buttons for change status project */}
      <ChangeStatus
        {...{
          isProgressStatus,
          isMarkDoneStatus,
          isCustomer,
          _id,
          specialist,
          onRefresh,
          isPendingSpecialistStatus,
        }}
        onOpenReview={onOpenReviewOfSpecialist}
      />

      <ReviewOfSpecialist
        project={_id}
        specialist={specialist?._id}
        ref={reviewOfSpecialistRef}
        onClose={onCloseReviewOfSpecialist}
        onRefresh={onRefresh}
      />

      <ReviewOfCustomer
        project={_id}
        customer={owner?._id}
        ref={reviewOfCustomerRef}
        onClose={onCloseReviewOfCustomer}
        onRefresh={onRefresh}
      />
    </>
  )
}
