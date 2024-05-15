import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { EColors } from '@/shared/ui/Styled'
import { CreateSkillBoxScreens } from '@/screens/List/CreateSkillBox'

import { EScreens } from '../../screens'

import { ScreenNavigationOptions } from '../options'

import { TCreateSkillBoxStack } from './types'

const Stack = createStackNavigator<TCreateSkillBoxStack>()

export const CreateSkillBoxStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.CreateSkillBoxMain}
      screenOptions={{
        ...ScreenNavigationOptions,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen
        name={EScreens.CreateSkillBoxMain}
        component={CreateSkillBoxScreens.Main}
      />

      <Stack.Screen
        name={EScreens.CreateSkillBoxFirst}
        component={CreateSkillBoxScreens.First}
      />

      <Stack.Screen
        name={EScreens.CreateSkillBoxSecond}
        component={CreateSkillBoxScreens.Second}
      />

      <Stack.Screen
        name={EScreens.CreateSkillBoxThird}
        component={CreateSkillBoxScreens.Third}
      />

      <Stack.Screen
        name={EScreens.CreateSkillBoxFourth}
        component={CreateSkillBoxScreens.Fourth}
      />
    </Stack.Navigator>
  )
}
