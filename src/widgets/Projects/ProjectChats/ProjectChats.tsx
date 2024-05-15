import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ListRenderItem, FlatList, RefreshControl } from 'react-native'
import { TProjectChatsProps } from './types'
import { Container, styles } from './styled'
import { TUser } from '@/entities/User/models'
import { ChatEntities } from '@/entities/Chat'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { TChat } from '@/entities/Chat/models'
import { useGetChats } from '@/features/Chat'
import { useIsFocused } from '@react-navigation/native'
import { Loader } from '@/shared/ui/loader'

export const ProjectChats = ({ projectId }: TProjectChatsProps) => {
  const { user } = useTypedSelector(getUserSelector)
  const { t } = useTranslation()

  const isFocused = useIsFocused()

  const {
    chatList,
    getFirstPage,
    loadMoreLoading,
    setRefreshLoading,
    refreshLoading,
    canGetMoreItems,
    refresh,
    getMore,
  } = useGetChats({ project: projectId })

  const { navigate } = useNavigation()

  const isEmpty = chatList.length === 0

  useEffect(() => {
    if (isFocused) getFirstPage()
  }, [isFocused, user?._id])

  const onNavigate = (id: string, users: TUser[], project?: string) => {
    const userId = users.filter(item => item._id !== user?._id)[0]

    if (!userId) {
      return
    }

    navigate(EScreens.ChatChat, { id, to: userId._id, isProject: !!project })
  }

  const renderChat: ListRenderItem<TChat> = ({ item }) => (
    <ChatEntities.ChatCard
      {...item}
      onRefresh={refresh}
      onPress={() => onNavigate(item._id, item.members, item.project)}
    />
  )

  const onGetMore = () => {
    if (canGetMoreItems) getMore()
  }

  const renderLoading = () => {
    if (loadMoreLoading) {
      return <Loader.Standard />
    }

    return null
  }

  const onRefresh = () => {
    setRefreshLoading(true)
    getFirstPage(true)
  }

  const renderEmpty = () => (
    <FlexWrapper height={'100%'}>
      <MRegular color={EColors.grey_600}>{t('empty.chat_list')}</MRegular>
    </FlexWrapper>
  )

  return (
    <Container>
      <FlatList
        data={chatList}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={renderChat}
        onEndReached={onGetMore}
        contentContainerStyle={[
          { paddingBottom: TAB_HEIGHT + 16 },
          isEmpty ? styles.flatEmpty : {},
        ]}
        ListFooterComponent={renderLoading}
        refreshControl={
          <RefreshControl
            refreshing={refreshLoading}
            onRefresh={onRefresh}
            tintColor={EColors.primary}
          />
        }
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  )
}
