import React, { useEffect } from 'react'
import { Header } from '@/widgets/header'
import { Background } from '@/shared/ui/background'
import { styles } from './styled'
import { ChatEntities } from '@/entities/Chat'
import { useGetChats } from '@/features/Chat'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { TUser } from '@/entities/User/models'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { getChatSelector } from '@/entities/Chat/store'
import { useIsFocused } from '@react-navigation/native'
import { FlatList, ListRenderItem, RefreshControl } from 'react-native'
import { TChat } from '@/entities/Chat/models'
import { EColors } from '@/shared/ui/Styled'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { Loader } from '@/shared/ui/loader'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'

export const Main = () => {
  const { t } = useTranslation()
  const {
    refresh,
    getFirstPage,
    canGetMoreItems,
    getMore,
    setRefreshLoading,
    refreshLoading,
    loading,
    loadMoreLoading,
  } = useGetChats({})

  const isFocused = useIsFocused()
  const { navigate } = useNavigation()
  const { user } = useTypedSelector(getUserSelector)
  const { chatList } = useTypedSelector(getChatSelector)

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
    if (!isEmpty && loadMoreLoading) {
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
      {!loading && (
        <MRegular color={EColors.grey_600}>{t('empty.chat_list')}</MRegular>
      )}

      {loading && <Loader.Standard size={'large'} />}
    </FlexWrapper>
  )

  return (
    <>
      <Header.Home />

      <Background.Standard style={styles.main}>
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
      </Background.Standard>
    </>
  )
}
