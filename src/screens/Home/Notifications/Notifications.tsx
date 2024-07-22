import React, { useEffect } from 'react'
import { Header } from '@/widgets/header'
import { Background } from '@/shared/ui/background'
import { styles } from './styled'

import { useGetNotifications } from '@/features/Notifications'
import { FlatList, ListRenderItem } from 'react-native'
import { TNotification } from '@/entities/Notifications/models'
import { NotificationsEntities } from '@/entities/Notifications'
import { NotificationsService } from '@/entities/Notifications/services'
import { useIsFocused } from '@react-navigation/native'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { Loader } from '@/shared/ui/loader'

export const Notifications = () => {
  const { t } = useTranslation()
  const { getFirstPage, notifications, loading } = useGetNotifications({})
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      NotificationsService.postNotificationSeen({})
      getFirstPage()
    }
  }, [isFocused])

  const renderItem: ListRenderItem<TNotification> = ({ item }) => (
    <NotificationsEntities.NotificationCard {...item} />
  )

  const renderEmpty = () => (
    <FlexWrapper height={'100%'}>
      {!loading && <MRegular>{t('notification_empty')}</MRegular>}

      {loading && <Loader.Standard />}
    </FlexWrapper>
  )
  return (
    <>
      <Header.Standard goBack />

      <Background.Standard style={styles.main}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[!notifications.length && styles.empty]}
          ListEmptyComponent={renderEmpty}
        />
      </Background.Standard>
    </>
  )
}
