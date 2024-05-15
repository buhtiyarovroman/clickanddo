import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from '..'
import { THomeHeaderProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, MMedium, StyledText } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { DrawerActions } from '@react-navigation/native'
import { NotificationContainer } from './styled'
import { UnreadCounter } from '../../../shared/ui/UnreadCounter'
import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { getNotificationSelector } from '@/entities/Notifications/store/selectors'

export const Home = ({ title = '', titleIcon }: THomeHeaderProps) => {
  const { dispatch, navigate } = useNavigation()
  const { totalCount } = useTypedSelector(getNotificationSelector)

  const countNotification = totalCount > 9 ? '9+' : totalCount + ''

  const onOpenDrawer = () => {
    dispatch(DrawerActions.openDrawer())
  }

  const onPressNotification = () => {
    navigate(EScreens.HomeNotifications)
  }
  return (
    <>
      <Header.Container>
        <FlexWrapper
          height={'100%'}
          style={styles.main}
          justify={'space-between'}>
          {/* Drawer open */}
          <TouchableOpacity style={styles.touch} onPress={onOpenDrawer}>
            <Icon name={'DrawerBurger'} size={20} />
            <UnreadCounter showTotal />
          </TouchableOpacity>

          {!!title && (
            <FlexWrapper width={'60%'}>
              {titleIcon && <Icon name={titleIcon} size={16} />}

              <MMedium numberOfLines={1} mLeft={'5px'}>
                {title}
              </MMedium>
            </FlexWrapper>
          )}

          {/* Notification */}
          <TouchableOpacity onPress={onPressNotification} activeOpacity={0.7}>
            {!!totalCount && (
              <NotificationContainer>
                <StyledText size={'8px'}>{countNotification}</StyledText>
              </NotificationContainer>
            )}
            <Icon name={'Bell'} size={20} />
          </TouchableOpacity>
        </FlexWrapper>
      </Header.Container>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  touch: {
    padding: 5,
  },
})
