import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { FeedbackJobBottomSheet } from '@/features/Projects/FeedbackJobBottomSheet'
import { Button } from '@/shared/ui/button'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import React, { useRef } from 'react'
import { TFeedbackButtonProps } from './types'
import { useTranslation } from 'react-i18next'
import { useCreateChat } from '@/features/Chat'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { BackContainer } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { EProjectResponsesChatsTabs } from '@/screens/Projects/ResponsesChats'

export const FeedbackButton = ({
  _id = '',
  onRefresh = () => {},
  projectResponses = [],
  specialist,
  owner,
  name = '',
  status = 'done',
}: TFeedbackButtonProps) => {
  const { t } = useTranslation()
  const ref = useRef<TBottomSheetBaseRef | null>(null)
  const { user } = useTypedSelector(getUserSelector)
  const isSpecialist = user?.role === 'specialist'
  const isThisSpecialist = specialist?._id === user?.role
  const { onCreateChat } = useCreateChat({})
  const { goBack, navigate } = useNavigation()
  const isSearch = status === 'searching'

  const disable =
    projectResponses.map(item => item.specialist).includes(user?._id || '') ||
    false

  const onClose = () => {
    onRefresh()
    ref.current?.close()
  }

  const onOpen = () => {
    ref.current?.open()
  }

  const onGoResponsesChat = (tabType?: EProjectResponsesChatsTabs) => {
    navigate(EScreens.JobResponsesChats, {
      id: _id,
      title: name,
      tabType,
      specialist: !!specialist,
    })
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

  return (
    <>
      <FlexWrapper justify={'space-between'} mTop={'16px'}>
        <BackContainer onPress={goBack}>
          <Icon name={'PagingArrowLeft'} stroke={EColors.white} />
        </BackContainer>

        {isSpecialist && (
          <Button.Standard
            width={'40%'}
            text={t('message')}
            onPress={onCreate}
          />
        )}

        {isSpecialist && !disable && !isThisSpecialist && isSearch && (
          <Button.Standard
            width={'40%'}
            onPress={onOpen}
            text={t('send_response')}
          />
        )}

        {!isSpecialist && (
          <Button.Standard
            width={'40%'}
            text={t('message')}
            onPress={() => onGoResponsesChat(EProjectResponsesChatsTabs.chats)}
          />
        )}

        {!isSpecialist && (
          <Button.Standard
            width={'40%'}
            text={t('responses')}
            onPress={() =>
              onGoResponsesChat(EProjectResponsesChatsTabs.responses)
            }
          />
        )}
      </FlexWrapper>

      <FeedbackJobBottomSheet _id={_id} ref={ref} onClose={onClose} />
    </>
  )
}
