import React from 'react'
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import { EDrawerStackScreens } from './types'
import { EColors } from '@/shared/ui/Styled'
import { CustomDrawer } from '@/widgets/Drawer'
import { TabStack } from '../tabs'
import { ProfileStack } from '../stacks/Profile'
import { PersonalDataStack } from '../stacks/PersonalData'
import { DrawerScreens } from '@/screens/Drawer'

const Drawer = createDrawerNavigator()
export const DrawerNavigator = () => {
  const renderDrawer = (props: DrawerContentComponentProps) => {
    return <CustomDrawer {...props} />
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        swipeEnabled: false,
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: EColors.white,
        },
      }}
      drawerContent={renderDrawer}
      useLegacyImplementation={false}
      initialRouteName={EDrawerStackScreens.TabStack}>
      <Drawer.Screen component={TabStack} name={EDrawerStackScreens.TabStack} />

      <Drawer.Screen
        component={ProfileStack}
        name={EDrawerStackScreens.ProfileStack}
        options={{ swipeEnabled: false }}
      />

      <Drawer.Screen
        component={PersonalDataStack}
        name={EDrawerStackScreens.PersonalDataStack}
        options={{ swipeEnabled: false }}
      />

      <Drawer.Screen
        name={EDrawerStackScreens.Settings}
        component={DrawerScreens.Settings}
        options={{ swipeEnabled: false }}
      />

      <Drawer.Screen
        name={EDrawerStackScreens.PaymentData}
        component={DrawerScreens.PaymentData}
        options={{ swipeEnabled: false }}
      />

      <Drawer.Screen
        name={EDrawerStackScreens.Support}
        component={DrawerScreens.Support}
        options={{ swipeEnabled: false }}
      />
    </Drawer.Navigator>
  )
}
