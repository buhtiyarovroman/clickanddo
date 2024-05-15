import React from 'react'

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'

import { CustomBottomTab } from '@/widgets/BottomTab'

import { HomeStack, ListStack, ProjectsStack } from '../../stacks'

import { ScreenTabOptions } from '../options'

import { ETabStacks, TTabStack } from './types'
import { ChatStack } from '../../stacks/Chat'
import { FavoritesStack } from '../../stacks/Favorites'

const Tab = createBottomTabNavigator<TTabStack>()

const tabBar = (props: BottomTabBarProps) => <CustomBottomTab {...props} />

export const TabStack = () => (
  <Tab.Navigator
    initialRouteName={ETabStacks.Home}
    screenOptions={ScreenTabOptions}
    tabBar={tabBar}>
    <Tab.Screen component={ListStack} name={ETabStacks.List} />
    <Tab.Screen component={ProjectsStack} name={ETabStacks.Projects} />
    <Tab.Screen component={HomeStack} name={ETabStacks.Home} />
    <Tab.Screen component={FavoritesStack} name={ETabStacks.Favorites} />
    <Tab.Screen component={ChatStack} name={ETabStacks.Chat} />
  </Tab.Navigator>
)
