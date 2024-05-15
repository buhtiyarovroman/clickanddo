import React, { forwardRef } from 'react'

import { TContactSpecialistBottomSheetProps } from './types'
import { Container } from './styled'
import { FlexWrapper, LRegular } from '@/shared/ui/Styled/Styled'
import { TouchableOpacity, View } from 'react-native'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { useCreateChat } from '@/features/Chat'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { ProjectsService } from '@/entities/Projects/services'

export const ContactSpecialistBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TContactSpecialistBottomSheetProps
>(({ onClose = () => {}, _id, project }, ref) => {
  const { t } = useTranslation()
  const { onCreateChat } = useCreateChat({})
  const { navigate } = useNavigation()

  const _onCreateChat = async () => {
    const chatID = await onCreateChat(_id, project, true)

    if (!chatID) return

    // if (!project) return

    // const { data } = await ProjectsService.getProjectById({ id: project })

    // if (!data) return

    navigate(EScreens.ProjectJobStack, {
      screen: EScreens.ChatChat,
      params: {
        to: _id,
        id: chatID,
        isProject: !!project,
      },
    })

    // navigate(EScreens.JobResponsesChats, {
    //   id: _id,
    // })

    onClose()
  }

  return (
    <BottomSheet.Base snapPoints={['25%']} ref={ref}>
      <Container>
        <FlexWrapper justify={'space-between'}>
          <View />

          <LRegular>{t('contact_specialist')}</LRegular>

          <TouchableOpacity onPress={onClose}>
            <Icon name={'Close'} stroke={EColors.grey_500} />
          </TouchableOpacity>
        </FlexWrapper>

        <Button.Standard
          mTop={'32px'}
          text={t('send_message')}
          onPress={_onCreateChat}
        />
      </Container>
    </BottomSheet.Base>
  )
})
