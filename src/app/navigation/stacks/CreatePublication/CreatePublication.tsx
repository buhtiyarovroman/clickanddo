import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { EColors } from '@/shared/ui/Styled'
import { CreatePublicationScreens } from '@/screens/List/CreatePublication'

import { EScreens } from '../../screens'

import { ScreenNavigationOptions } from '../options'

import { TCreatePublicationStack } from './types'

const Stack = createStackNavigator<TCreatePublicationStack>()

export const CreatePublicationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.CreatePublicationMain}
      screenOptions={{
        ...ScreenNavigationOptions,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen
        name={EScreens.CreatePublicationMain}
        component={CreatePublicationScreens.Main}
      />

      <Stack.Screen
        name={EScreens.CreatePublicationSuccess}
        component={CreatePublicationScreens.Success}
      />
    </Stack.Navigator>
  )
}
