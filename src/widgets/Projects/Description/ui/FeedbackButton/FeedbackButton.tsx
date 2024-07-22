import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { FeedbackJobBottomSheet } from '@/features/Projects/FeedbackJobBottomSheet'
import { Button } from '@/shared/ui/button'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import React, { useContext, useRef, useState } from 'react'
import { TFeedbackButtonProps } from './types'
import { useTranslation } from 'react-i18next'
import { useCreateChat } from '@/features/Chat'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { EProjectResponsesChatsTabs } from '@/screens/Projects/ResponsesChats'
import { LoaderContext } from '@/app/contexts/Loader'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { ProjectsService } from '@/entities/Projects/services'
import { EColors } from '@/shared/ui/Styled'
import { styles } from './styled'
import { ReviewOfSpecialist } from '@/features/Projects/ReviewOfSpecialist'
import { ReviewOfCustomer } from '@/features/Projects/ReviewOfCustomer'
import { Modal } from '@/shared/ui/modals'
import { TModalViewRef } from '@/shared/ui/modals/ViewModal'

export const FeedbackButton = ({
  _id = '',
  onRefresh = () => {},
  projectResponses = [],
  specialist,
  owner,
  name = '',
  status = 'done',
  customerReview = false,
  specialistReview = false,
}: TFeedbackButtonProps) => {
  const { t } = useTranslation()
  const ref = useRef<TBottomSheetBaseRef | null>(null)
  const modalRef = useRef<TModalViewRef | null>(null)
  const { setLoading } = useContext(LoaderContext)
  const { user } = useTypedSelector(getUserSelector)
  const { onCreateChat } = useCreateChat({})
  const { navigate } = useNavigation()
  const [myResponseId, setMyResponseId] = useState('')

  const isSpecialist = user?.role === 'specialist'
  const isThisSpecialist = specialist?._id === user?.role

  const isSearch = status === 'searching'
  const isDone = status === 'done'
  const isPendingSpecialist = status === 'pending-specialist'
  const isMarkDoneStatus = status === 'mark-done'
  const isHold = status === 'hold'
  const isProgressStatus = status === 'in-progress'

  const isShowFeedbackButton =
    isDone && (isSpecialist ? !customerReview : !specialistReview)

  const responsesIDs = [
    ...projectResponses.map(item => item.specialist),
    myResponseId,
  ]

  const haveMyResponse = responsesIDs.includes(user?._id || '') || false

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

  const onOpenCurrentReview = () => {
    if (isSpecialist) {
      onOpenReviewOfCustomer()
      return
    }
    onOpenReviewOfSpecialist()
  }
  const onClose = () => {
    setMyResponseId(user?._id || '')
    onRefresh()
    ref.current?.close()
  }

  const onOpen = () => {
    ref.current?.open()
  }

  const onGoResponsesChat = () => {
    navigate(EScreens.JobResponsesChats, {
      id: _id,
      title: name,
      specialist: !!specialist,
    })
  }

  const onMarkDone = async (newStatus: EProjectTypes) => {
    if (!_id) {
      console.error('no have project id')
      return
    }

    try {
      setLoading(true)

      await ProjectsService.patchProjectStatus({
        id: _id,
        status: `${newStatus}`,
      })

      onRefresh()
    } catch (err) {
      console.log('ProjectOnMarkDone err =>', err)
    } finally {
      setLoading(false)
    }
  }

  const onCreate = async () => {
    const chatId = await onCreateChat(owner?._id, _id, true)

    if (!chatId) return

    if (isSpecialist) {
      navigate(EScreens.ChatChat, {
        id: chatId,
        to: owner?._id!,
        isProject: !!_id,
      })

      return
    }

    onGoResponsesChat(EProjectResponsesChatsTabs.chats)
  }

  const onCloseModal = () => {
    modalRef.current?.close()
  }
  const onOpenModal = () => {
    modalRef.current?.open()
  }

  return (
    <>
      {/* Specialist, status = in progress, change => mark_done */}
      {isSpecialist && !!specialist && isProgressStatus && (
        <FlexWrapper justify={'space-between'}>
          <Button.Standard
            width={'100%'}
            mTop={'16px'}
            color={EColors.black}
            onPress={onOpenModal}
            text={t('tabs_list.completed')}
          />
        </FlexWrapper>
      )}

      {/* Customer, status = mark_done, change status to  in_progress or done */}
      {!isSpecialist && !!specialist && isMarkDoneStatus && (
        <FlexWrapper mTop={'16px'} justify={'space-between'}>
          <Button.Standard
            height={'45px'}
            width={'49%'}
            style={styles.button}
            color={EColors.transparent}
            onPress={() => onMarkDone(EProjectTypes.in_progress)}>
            <MRegular color={EColors.black}>{t('cancel')}</MRegular>
          </Button.Standard>

          <Button.Standard
            height={'45px'}
            width={'49%'}
            color={EColors.black}
            onPress={() => onMarkDone(EProjectTypes.done)}>
            <MRegular color={EColors.white}>{t('mark_completed')}</MRegular>
          </Button.Standard>
        </FlexWrapper>
      )}

      {/* Specialist, approve personal project */}

      {isSpecialist && isPendingSpecialist && (
        <FlexWrapper justify={'space-between'} mTop={'16px'}>
          <Button.Standard
            width={'45%'}
            text={t('take_the_job')}
            onPress={() => onMarkDone(EProjectTypes.in_progress)}
          />
          <Button.Standard
            width={'45%'}
            style={styles.button}
            color={EColors.transparent}
            textColor={EColors.black}
            onPress={() => onMarkDone(EProjectTypes.rejected_by_specialist)}
            text={t('refuse')}
          />
        </FlexWrapper>
      )}

      {!isSpecialist && !isHold && (
        <Button.Standard
          text={t('job_screen_tab.responses')}
          onPress={onGoResponsesChat}
          mTop={'12px'}
        />
      )}

      <FlexWrapper justify={'space-around'} mTop={'16px'}>
        {isSpecialist && (
          <Button.Standard
            width={'40%'}
            text={t('message')}
            onPress={onCreate}
          />
        )}

        {isShowFeedbackButton && (
          <Button.Standard
            width={'40%'}
            color={EColors.black}
            onPress={onOpenCurrentReview}
            text={t('leave_review')}
          />
        )}

        {isSpecialist && !haveMyResponse && !isThisSpecialist && isSearch && (
          <Button.Standard
            width={'40%'}
            onPress={onOpen}
            text={t('send_response')}
          />
        )}

        {isSpecialist && haveMyResponse && !isThisSpecialist && isSearch && (
          <FlexWrapper width={'40%'}>
            <MRegular color={EColors.grey_500} align={'center'}>
              {t('waiting_approve_response')}
            </MRegular>
          </FlexWrapper>
        )}
      </FlexWrapper>

      <FeedbackJobBottomSheet _id={_id} ref={ref} onClose={onClose} />

      <Modal.AcceptModal
        ref={modalRef}
        title={t('you_end_work_project')}
        onPressAgree={() => onMarkDone(EProjectTypes.mark_done)}
        onPressDisagree={onCloseModal}
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
