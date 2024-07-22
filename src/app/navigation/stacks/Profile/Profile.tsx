import React from 'react'
import { TProfileStack } from './types'
import { ScreenNavigationOptionsNative } from '../options'
import { EScreens } from '../../screens'
import { ProfileScreens } from '@/screens/Profile'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { JobStack } from '../Job'

const Stack = createNativeStackNavigator<TProfileStack>()

export const ProfileStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.ProfileMain}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen component={ProfileScreens.Main} name={EScreens.ProfileMain} />
    <Stack.Screen
      component={ProfileScreens.AccountData}
      name={EScreens.ProfileAccountData}
    />
    <Stack.Screen
      component={ProfileScreens.Languages}
      name={EScreens.ProfileAddInfoLanguage}
    />

    <Stack.Screen
      component={ProfileScreens.VerifyProfile}
      name={EScreens.ProfileAddInfoVerification}
    />

    <Stack.Screen
      component={ProfileScreens.Education}
      name={EScreens.ProfileAddInfoEducation}
    />

    <Stack.Screen
      component={ProfileScreens.Work}
      name={EScreens.ProfileAddInfoWork}
    />

    <Stack.Screen component={JobStack} name={EScreens.JobStack} />
  </Stack.Navigator>
)
