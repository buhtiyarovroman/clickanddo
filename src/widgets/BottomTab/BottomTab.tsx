import React, { useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

import { EScreens, whiteList } from '@/app/navigation'
import { ETabStacks } from '@/app/navigation/tabs/Main/types'

import { useTabs } from './useTabs'
import { Component } from './components'
import { useAnimatedTab } from './useAnimatedTab'
import { Container, StyledTabButton } from './styled'
import { getChatSelector } from '@/entities/Chat/store'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const CustomBottomTab = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { tabs } = useTabs()
  const { visible, setVisible, animatedStyle } = useAnimatedTab()
  const { allUnreadCount } = useTypedSelector(getChatSelector)
  const { user } = useTypedSelector(getUserSelector)

  // const { t } = useTranslation()

  useEffect(() => {
    const currentRoute = state.routes[state.index]

    const focusedScreen = (getFocusedRouteNameFromRoute(currentRoute) ??
      currentRoute.name.replace('TabStack', 'MainScreen')) as EScreens

    setVisible(whiteList.includes(focusedScreen))
  }, [state])

  return (
    <>
      {visible && (
        <Container style={animatedStyle}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]

            const isFocused = state.index === index
            const tab = tabs[route.name as ETabStacks]

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                // The `merge: true` option makes sure that the params inside the tab screen are preserved
                navigation.navigate(route.name, {
                  name: route.name,
                  merge: true,
                })
              }
            }

            const unreadCount =
              allUnreadCount.find(el => el._id === user?._id)?.count || 0

            const chatCount =
              (route.name as ETabStacks) === ETabStacks.Chat ? unreadCount : 0

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              })
            }

            return (
              <StyledTabButton
                activeOpacity={1}
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}>
                <Component.Tab
                  count={chatCount}
                  icon={tab.Icon}
                  active={isFocused}
                  activeIcon={tab.ActiveIcon}
                />
              </StyledTabButton>
            )
          })}
        </Container>
      )}
    </>
  )
}
