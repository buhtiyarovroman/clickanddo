import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TProjectsStack } from './types'
import { ScreenNavigationOptionsNative } from '../options'
import { EScreens } from '../../screens'
import { ProjectsScreens } from '@/screens/Projects'
import { JobStack } from '../Job'
import { CreateProjectStack } from '../CreateProject'
import { PublicationStack } from '../Publication'

const Stack = createNativeStackNavigator<TProjectsStack>()

export const ProjectsStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.ProjectsMain}
    screenOptions={{
      ...ScreenNavigationOptionsNative,
    }}>
    <Stack.Screen
      component={ProjectsScreens.Main}
      name={EScreens.ProjectsMain}
    />

    <Stack.Screen
      component={ProjectsScreens.ProjectResponses}
      name={EScreens.ProjectResponses}
    />

    <Stack.Screen component={JobStack} name={EScreens.ProjectJobStack} />

    <Stack.Screen
      component={PublicationStack}
      name={EScreens.ProjectPublicationStack}
    />

    <Stack.Screen
      component={CreateProjectStack}
      name={EScreens.ProjectCreateStack}
    />
  </Stack.Navigator>
)
