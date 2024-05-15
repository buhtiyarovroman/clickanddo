import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { EScreens } from '../../screens'
import { ScreenNavigationOptions } from '../options'
import { EColors } from '@/shared/ui/Styled'
import { TSpecialOfferStack } from './types'
import { SpecialOfferScreen } from '@/screens/List/SpecialOffer'

const Stack = createStackNavigator<TSpecialOfferStack>()

export const SpecialOfferStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={EScreens.SpecialOfferMain}
      screenOptions={{
        ...ScreenNavigationOptions,
        cardStyle: {
          backgroundColor: EColors.white,
        },
      }}>
      <Stack.Screen
        name={EScreens.SpecialOfferMain}
        component={SpecialOfferScreen.Intro}
      />
      <Stack.Screen
        name={EScreens.SpecialOfferCreateFirst}
        component={SpecialOfferScreen.CreateFirst}
      />
      <Stack.Screen
        name={EScreens.SpecialOfferCreateSecond}
        component={SpecialOfferScreen.CreateSecond}
      />
      <Stack.Screen
        name={EScreens.SpecialOfferCreateThird}
        component={SpecialOfferScreen.CreateThird}
      />
      <Stack.Screen
        name={EScreens.SpecialOfferCreateFourth}
        component={SpecialOfferScreen.CreateFourth}
      />
    </Stack.Navigator>
  )
}
