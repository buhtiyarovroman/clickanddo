import React from 'react'
import { TChatStack } from './types'
import { ScreenNavigationOptionsNative } from '../options'
import { EScreens } from '../../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ChatScreens } from '@/screens/Chat'
import { JobStack } from '../Job'
import { HomeScreens } from '@/screens/Home'

const Stack = createNativeStackNavigator<TChatStack>()

export const ChatStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.ChatMain}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen component={ChatScreens.Main} name={EScreens.ChatMain} />
    <Stack.Screen component={ChatScreens.Chat} name={EScreens.ChatChat} />
    <Stack.Screen component={JobStack} name={EScreens.JobStack} />

    <Stack.Screen
      component={HomeScreens.Notifications}
      name={EScreens.HomeNotifications}
    />
  </Stack.Navigator>
)
