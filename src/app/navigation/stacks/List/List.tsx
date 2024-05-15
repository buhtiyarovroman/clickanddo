import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { EColors } from '@/shared/ui/Styled'
import { ListScreens } from '@/screens/List'

import { EScreens } from '../../screens'

import { ScreenNavigationOptions } from '../options'
import { CreateSkillBoxStack } from '../CreateSkillBox'
import { CreatePublicationStack } from '../CreatePublication'

import { TListStack } from './types'
import { SpecialOfferStack } from '../SpecialOffer'
import { JobStack } from '../Job'
import { PublicationStack } from '../Publication'

const Stack = createStackNavigator<TListStack>()

export const ListStack = () => (
  <Stack.Navigator
    initialRouteName={EScreens.ListMain}
    screenOptions={{
      ...ScreenNavigationOptions,
      cardStyle: {
        backgroundColor: EColors.white,
      },
    }}>
    <Stack.Screen name={EScreens.ListMain} component={ListScreens.Main} />
    <Stack.Screen
      name={EScreens.ListMyCalendar}
      component={ListScreens.MyCalendar}
    />

    <Stack.Screen
      name={EScreens.ListCreatePublication}
      component={CreatePublicationStack}
    />

    <Stack.Screen
      name={EScreens.ListCreateSkillBox}
      component={CreateSkillBoxStack}
    />
    <Stack.Screen
      component={SpecialOfferStack}
      name={EScreens.ListSpecialOffer}
    />

    <Stack.Screen
      component={PublicationStack}
      name={EScreens.ListPublicationStack}
    />

    <Stack.Screen component={JobStack} name={EScreens.ListJobs} />

    <Stack.Screen name={EScreens.ListMap} component={ListScreens.Map} />
  </Stack.Navigator>
)
