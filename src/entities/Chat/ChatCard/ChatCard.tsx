import React, { useContext } from 'react'
import {
  ChatCardContainer,
  ChatUserImage,
  CounterText,
  DeleteContainer,
  UnreadCounter,
} from './styled'
import {
  FlexWrapper,
  LSemibold,
  MMedium,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { format, isToday } from 'date-fns'
import { Icon } from '@/shared/ui/Icon'
import { SwipeChat } from '@/shared/ui/SwipeChat'
import { TChatCardProps } from './types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { LoaderContext } from '@/app/contexts/Loader'
import { ChatEntities } from '..'
import { useTranslation } from 'react-i18next'
import { dateLocale } from '@/shared/utils'
import i18next from 'i18next'

export const ChatCard = ({
  members = [],
  onPress = () => {},
  onRefresh = () => {},
  lastMessage,
  _id,
  unreadCount,
}: TChatCardProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)
  const { setLoading } = useContext(LoaderContext)
  const lastMessageDate = new Date(lastMessage?.createdAt || new Date())
  const isLastMessage = true
  const isSeen = !unreadCount

  const interlocutor = members.filter(item => item._id !== user?._id)[0]

  const currentName = interlocutor
    ? interlocutor.name || '' + interlocutor.secondName || ''
    : ''

  const imageUser = interlocutor?.photo

  const TextComponent = isLastMessage ? SRegular : MMedium
  const TextColor = isLastMessage ? EColors.grey_500 : EColors.black

  const lastText = lastMessage?.message
    ? lastMessage?.message
    : lastMessage?.files?.length > 1
    ? t('files')
    : lastMessage?.files.length === 1
    ? t('file')
    : ''

  const onDeleteChat = async () => {
    try {
      if (!_id) {
        console.error('no have id chat for delete')
        return
      }
      setLoading(true)

      await ChatEntities.ChatService.deleteChat({ id: _id })

      onRefresh()
    } catch (err) {
      console.log('onDelete chat err =>', err)
    } finally {
      setLoading(false)
    }
  }

  const renderLeft = () => (
    <DeleteContainer onPress={onDeleteChat}>
      <Icon name={'Trash'} />
    </DeleteContainer>
  )

  return (
    <SwipeChat renderLeftActions={renderLeft}>
      <ChatCardContainer isSeen={isSeen} onPress={onPress}>
        <FlexWrapper width={'80%'}>
          <ChatUserImage source={imageUser} type={'user'} />

          <FlexWrapper
            mLeft={'16px'}
            width={'70%'}
            align={'flex-start'}
            flexDirection={'column'}>
            <LSemibold numberOfLines={1} mBottom={'5px'}>
              {currentName}
            </LSemibold>

            <TextComponent numberOfLines={1} color={TextColor}>
              {lastText || t('no_messages')}
            </TextComponent>
          </FlexWrapper>
        </FlexWrapper>

        <FlexWrapper width={'auto'} align={'flex-end'} flexDirection={'column'}>
          <SRegular color={EColors.grey_500}>
            {format(
              lastMessageDate,
              isToday(lastMessageDate) ? 'HH:mm' : 'dd MMMM',
              { locale: dateLocale[i18next.language] },
            )}
            {}
          </SRegular>

          {!!unreadCount && (
            <UnreadCounter>
              <CounterText>{unreadCount}</CounterText>
            </UnreadCounter>
          )}
          {!unreadCount && <Icon size={16} name={'DoubleCheck'} />}
        </FlexWrapper>
      </ChatCardContainer>
    </SwipeChat>
  )
}
