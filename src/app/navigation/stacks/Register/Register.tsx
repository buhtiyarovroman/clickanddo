import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TRegisterStack } from './types'
import { ScreenNavigationOptions } from '../options'
import { EScreens } from '../../screens'
import { EColors } from '@/shared/ui/Styled'
import { RegisterScreens } from '@/screens/Register'

const Stack = createStackNavigator<TRegisterStack>()

export const RegisterStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.RegisterMain}
      screenOptions={{
        ...ScreenNavigationOptions,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen
        component={RegisterScreens.Main}
        name={EScreens.RegisterMain}
      />

      {/* Register */}

      <Stack.Screen
        component={RegisterScreens.Second}
        name={EScreens.RegisterSecond}
      />
    </Stack.Navigator>
  )
}
