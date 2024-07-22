import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TCreateProjectStack } from './types'
import { ScreenNavigationOptionsNative } from '../options'
import { EScreens } from '../../screens'
import { CreateProjectsScreens } from '@/screens/CreateProject'

const Stack = createNativeStackNavigator<TCreateProjectStack>()

export const CreateProjectStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.ProjectCreateFirst}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen
      component={CreateProjectsScreens.First}
      name={EScreens.ProjectCreateFirst}
    />

    <Stack.Screen
      component={CreateProjectsScreens.Second}
      name={EScreens.ProjectCreateSecond}
    />

    <Stack.Screen
      component={CreateProjectsScreens.Fourth}
      name={EScreens.ProjectCreateFourth}
    />
    <Stack.Screen
      component={CreateProjectsScreens.Preview}
      name={EScreens.ProjectPreviewScreen}
    />
    <Stack.Screen
      component={CreateProjectsScreens.CreateSuccess}
      name={EScreens.ProjectCreateSuccess}
    />

    <Stack.Screen
      component={CreateProjectsScreens.Personal}
      name={EScreens.ProjectCreatePersonal}
    />
  </Stack.Navigator>
)
