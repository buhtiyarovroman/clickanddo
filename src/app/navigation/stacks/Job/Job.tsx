import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TJobStack } from './types'
import { ScreenNavigationOptionsNative } from '../options'
import { EScreens } from '../../screens'
import { ProjectsScreens } from '@/screens/Projects'
import { ProfileScreens } from '@/screens/Profile'
import { CreateProjectStack } from '../CreateProject'
import { ChatScreens } from '@/screens/Chat'

const Stack = createNativeStackNavigator<TJobStack>()

export const JobStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.JobMain}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen component={ProjectsScreens.Job} name={EScreens.JobMain} />

    <Stack.Screen
      component={ProjectsScreens.ResponsesChats}
      name={EScreens.JobResponsesChats}
    />

    <Stack.Screen component={ChatScreens.Chat} name={EScreens.ChatChat} />
    <Stack.Screen
      component={ProfileScreens.OtherProfile}
      name={EScreens.JobProfile}
    />

    <Stack.Screen
      component={CreateProjectStack}
      name={EScreens.JobCreateProjectStack}
    />
  </Stack.Navigator>
)
