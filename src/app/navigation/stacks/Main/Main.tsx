import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TMainStack } from './types'
import { ScreenNavigationOptions } from '../options'
import { EColors } from '@/shared/ui/Styled'
import { EStacks } from '../stacks'
import { DrawerNavigator } from '../../drawer'
import { AuthStack } from '../Auth'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

const Stack = createStackNavigator<TMainStack>()

export const MainStack = () => {
  const { user } = useTypedSelector(getUserSelector)

  const initialScreen = user ? EStacks.Drawer : EStacks.Auth
  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        ...ScreenNavigationOptions,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen component={AuthStack} name={EStacks.Auth} />

      <Stack.Screen component={DrawerNavigator} name={EStacks.Drawer} />
    </Stack.Navigator>
  )
}
