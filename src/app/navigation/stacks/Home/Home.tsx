import React from 'react'
import { THomeStack } from './types'
import { ScreenNavigationOptionsNative } from '../options'
import { EScreens } from '../../screens'
import { HomeScreens } from '@/screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { JobStack } from '../Job'

const Stack = createNativeStackNavigator<THomeStack>()

export const HomeStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.HomeMain}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen component={HomeScreens.Main} name={EScreens.HomeMain} />
    <Stack.Screen
      component={HomeScreens.Specialists}
      name={EScreens.HomeSpecialists}
    />

    <Stack.Screen name={EScreens.HomeSearch} component={HomeScreens.Search} />

    <Stack.Screen name={EScreens.HomeMap} component={HomeScreens.Map} />

    <Stack.Screen component={JobStack} name={EScreens.HomeJobStackScreen} />

    <Stack.Screen
      component={HomeScreens.Notifications}
      name={EScreens.HomeNotifications}
    />
  </Stack.Navigator>
)
