import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TAuthStack } from './types'
import { ScreenNavigationOptions } from '../options'
import { EScreens } from '../../screens'
import { EColors } from '@/shared/ui/Styled'
import { AuthScreens } from '@/screens/Auth'
import { RegisterStack } from '../Register'
import { getUserSelector } from '@/entities/User'
import { useTypedSelector } from '@/app/store'

const Stack = createStackNavigator<TAuthStack>()

export const AuthStack = () => {
  const { seeOnboarding } = useTypedSelector(getUserSelector)

  return (
    <Stack.Navigator
      initialRouteName={
        seeOnboarding ? EScreens.AuthMain : EScreens.AuthOnboarding
      }
      screenOptions={{
        ...ScreenNavigationOptions,
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen
        component={AuthScreens.Onboarding}
        name={EScreens.AuthOnboarding}
      />

      <Stack.Screen component={AuthScreens.Main} name={EScreens.AuthMain} />

      <Stack.Screen component={AuthScreens.Login} name={EScreens.AuthLogin} />
      <Stack.Screen
        component={AuthScreens.EmailSended}
        name={EScreens.AuthEmailSended}
      />

      <Stack.Screen
        component={AuthScreens.VerifyPhone}
        name={EScreens.AuthVerifyPhone}
      />

      <Stack.Screen component={RegisterStack} name={EScreens.AuthRegister} />
    </Stack.Navigator>
  )
}
