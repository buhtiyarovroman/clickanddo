import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TFavoritesStack } from './types'
import { EScreens } from '../../screens'
import { ScreenNavigationOptionsNative } from '../options'
import { FavoritesScreens } from '@/screens/Favorites'
import { HomeScreens } from '@/screens/Home'
import { PublicationStack } from '../Publication'
import { JobStack } from '../Job'

const Stack = createNativeStackNavigator<TFavoritesStack>()

export const FavoritesStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.FavoritesMain}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen
      component={FavoritesScreens.Main}
      name={EScreens.FavoritesMain}
    />
    <Stack.Screen
      component={PublicationStack}
      name={EScreens.FavoritesPublicationStack}
    />

    <Stack.Screen
      component={HomeScreens.Notifications}
      name={EScreens.HomeNotifications}
    />

    <Stack.Screen component={JobStack} name={EScreens.JobStack} />
  </Stack.Navigator>
)
