import React from 'react'

import { EColors } from '@/shared/ui/Styled'
import { ListScreens } from '@/screens/List'

import { EScreens } from '../../screens'

import { ScreenNavigationOptionsNative } from '../options'

import { TPublicationStack } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<TPublicationStack>()

export const PublicationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.PublicationScreen}
      screenOptions={{
        ...ScreenNavigationOptionsNative,
        // cardStyle: {
        //   backgroundColor: EColors.white,
        // },
      }}>
      <Stack.Screen
        component={ListScreens.Publication}
        name={EScreens.PublicationScreen}
      />
      <Stack.Screen
        component={ListScreens.PublicationResponses}
        name={EScreens.PublicationResponses}
      />
    </Stack.Navigator>
  )
}
