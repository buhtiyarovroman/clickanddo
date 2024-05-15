import React, { useEffect, useMemo, useRef } from 'react'
import { Header } from '@/widgets/header'
import { Background } from '@/shared/ui/background'
import { Separator, styles } from './styled'
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native'
import { TChatStack } from '@/app/navigation/stacks/Chat'
import { EScreens } from '@/app/navigation'
import { useGetChatByMembers } from '@/features/Chat'
import { Input } from '@/shared/ui/input'
import { TMessage } from '@/entities/Chat/models'
import { ChatEntities } from '@/entities/Chat'
import { FlatList, ListRenderItem, Platform } from 'react-native'
import { useTypedSelector } from '@/app/store'
import { chatActions, getChatSelector } from '@/entities/Chat/store'
import { Png } from '@assets/Png'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { Loader } from '@/shared/ui/loader'
import { onGetCurrentLastMessages } from './helpers'
import { KeyboardAvoidingView } from 'react-native-keyboard-controller'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const isIOS = Platform.OS === 'ios'

const heightScreen = isIOS ? hp(85) : hp(90)

export const Chat = () => {
  const { id, isProject } =
    useRoute<RouteProp<TChatStack, EScreens.ChatChat>>().params
  const flatListRef = useRef<FlatList | null>(null)
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const { bottom } = useSafeAreaInsets()
  const { localLastMessage } = useTypedSelector(getChatSelector)

  const currentChatMessages = onGetCurrentLastMessages(id, localLastMessage)

  const {
    chatMessages,
    getFirstPage,
    getMore,
    canGetMoreItems,
    loadMoreLoading,
  } = useGetChatByMembers({ id, isProject })

  const combineMessages = useMemo(
    () => [
      ...(currentChatMessages.messages as TMessage[]),
      ...chatMessages.messages,
    ],
    [chatMessages, currentChatMessages.messages],
  )

  useEffect(() => {
    if (isFocused) dispatch(chatActions.postSeenRequest({ id }))
  }, [isFocused, chatMessages, dispatch, id])

  useEffect(() => {
    if (isFocused) {
      getFirstPage()
    }
  }, [isFocused])

  const renderMessage: ListRenderItem<TMessage> = ({ item, index }) => {
    const isLastInGroup =
      combineMessages.length - 1 === index || index === 0
        ? false
        : item.from !== combineMessages[index - 1].from || false
    return <ChatEntities.Message {...item} isLastGroupMessage={isLastInGroup} />
  }

  const onGetMore = () => {
    if (canGetMoreItems) {
      getMore()
    }
  }

  const renderLoader = () => {
    if (canGetMoreItems && loadMoreLoading) {
      return <Loader.Standard mTop={'10px'} mBottom={'10px'} />
    }

    return <Separator />
  }

  return (
    <>
      <Header.Chat />
      <Background.Image
        source={Png.ChatBackground}
        style={[styles.main, { paddingBottom: bottom }]}>
        <KeyboardAvoidingView
          behavior={'height'}
          keyboardVerticalOffset={70 + bottom}
          style={{ height: heightScreen - bottom + (isIOS ? 16 : 0) }}>
          <FlatList
            ref={flatListRef}
            showsVerticalScrollIndicator={false}
            inverted
            onEndReached={onGetMore}
            data={combineMessages}
            renderItem={renderMessage}
            ListFooterComponent={renderLoader}
          />
          <Input.Chat flatListRef={flatListRef} />
        </KeyboardAvoidingView>
      </Background.Image>
    </>
  )
}
