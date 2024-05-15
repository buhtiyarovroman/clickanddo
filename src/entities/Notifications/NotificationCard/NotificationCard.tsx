import React, { useContext } from 'react'
import { Container, UserImage, Dot, styles, OtherImage } from './styled'
import {
  FlexWrapper,
  MMedium,
  MRegular,
  MSemibold,
} from '@/shared/ui/Styled/Styled'
import { TNotificationCardProps } from './types'
import { formatDateDistance } from './helper'
import { EColors, Styled } from '@/shared/ui/Styled'
import { EPushType } from '@/app/contexts/PushNotification/types'
import { TImageType } from '@/shared/ui/image/Standard/types'
import { useNavigation } from '@/features/hooks'
import { EScreens, ETabStacks } from '@/app/navigation'
import { ProjectsService } from '@/entities/Projects/services'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { PublicationService } from '@/entities/Publication/services'
import { ChatEntities } from '@/entities/Chat'
import { LoaderContext } from '@/app/contexts/Loader'

export const NotificationCard = ({
  message = '',
  status = 'read',
  createdAt = new Date().toString(),
  payload,
  user,
  title = '',
  project,
  publication,
  ...props
}: TNotificationCardProps) => {
  const { goBack, navigate } = useNavigation()
  const { setting, user: myUser } = useTypedSelector(getUserSelector)

  const { setLoading } = useContext(LoaderContext)

  const isPublication = payload?.type === EPushType.publication
  const isProject = payload?.type === EPushType.project
  const isChat = payload?.type === EPushType.chat

  const currentTitleName =
    (isProject || isPublication) &&
    `(${isProject ? project?.name : isPublication ? publication?.heading : ''})`

  // eslint-disable-next-line no-nested-ternary
  const currentImage = isProject
    ? project?.images[0]
    : isPublication
    ? publication?.images[0]
    : ''

  // eslint-disable-next-line no-nested-ternary
  const currentType: TImageType | undefined = isProject
    ? 'project'
    : isPublication
    ? 'publication'
    : undefined

  const timeAgo = formatDateDistance(createdAt)

  const onPress = async () => {
    setLoading(true)
    try {
      if (isChat) {
        const { data } = await ChatEntities.ChatService.getChatById({
          id: payload.id,
        })

        if (!data) return
        goBack()

        navigate(ETabStacks.Chat, {
          screen: EScreens.ChatChat,
          params: {
            id: data._id,
            to: data.members.filter(item => item._id !== myUser?._id)[0]._id,
            isProject: !!data.project,
          },
          initial: false,
        })

        return
      }

      if (isProject) {
        if (!project) return

        const { data } = await ProjectsService.getProjectById({
          id: project._id,
          currency: setting.currency,
        })
        goBack()

        navigate(ETabStacks.Projects, {
          screen: EScreens.ProjectJobStack,
          params: {
            screen: EScreens.JobMain,
            params: {
              project: data,
            },
          },
        })
        return
      }

      if (isPublication) {
        const { data } = await PublicationService.getPublicationById({
          id: payload.id,
          currency: setting.currency,
        })
        goBack()

        navigate(ETabStacks.List, {
          screen: EScreens.ListPublicationStack,
          params: {
            screen: EScreens.PublicationScreen,
            params: {
              type: data.type,
              id: payload.id,
            },
          },
        })
        return
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container mBottom={'16px'} {...props} onPress={onPress}>
      <FlexWrapper width={'auto'}>
        <UserImage type={'user'} source={user?.photo} />
      </FlexWrapper>

      <Styled.FlexWrapper
        mLeft={'20px'}
        align={'flex-start'}
        flexDirection={'column'}>
        <Styled.FlexWrapper
          mBottom={'5px'}
          width={'70%'}
          justify={'space-between'}>
          <Styled.FlexWrapper align={'flex-start'} flexDirection={'column'}>
            <Styled.FlexWrapper mBottom={'5px'} width={'auto'}>
              <MSemibold mRight={'16px'}>
                {user?.name} {user?.secondName}{' '}
                <MRegular color={EColors.black_35}>{timeAgo}</MRegular>
              </MSemibold>
              {status === 'new' && <Dot />}
            </Styled.FlexWrapper>
            <MMedium color={EColors.black_35}>
              {title} {currentTitleName}
            </MMedium>
          </Styled.FlexWrapper>
          {!!currentImage && (
            <OtherImage source={currentImage} type={currentType} />
          )}
        </Styled.FlexWrapper>
        {!!isChat && !!payload && (
          <MSemibold style={styles.message}>
            {isPublication ? publication?.heading : message}
          </MSemibold>
        )}
      </Styled.FlexWrapper>
    </Container>
  )
}
