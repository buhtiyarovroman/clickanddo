import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TPersonalDataStack } from './types'
import { ScreenNavigationOptions } from '../options'
import { EColors } from '@/shared/ui/Styled'
import { EScreens } from '../../screens'
import { PersonalDataScreen } from '@/screens/PersonalData'

const Stack = createStackNavigator<TPersonalDataStack>()

export const PersonalDataStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.PersonalDataMain}
      screenOptions={{
        ...ScreenNavigationOptions,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen
        component={PersonalDataScreen.Main}
        name={EScreens.PersonalDataMain}
      />

      <Stack.Screen
        component={PersonalDataScreen.VerifyPhone}
        name={EScreens.PersonalDataPhoneVerify}
      />
    </Stack.Navigator>
  )
}
