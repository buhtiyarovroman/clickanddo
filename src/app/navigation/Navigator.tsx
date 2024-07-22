import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { MainStack } from './stacks'
import { Navigation } from './ref'
import { Contexts } from '../contexts'
import { HandleDeepLinking } from './HandleDeepLinking'

export const Navigator = () => (
  <NavigationContainer ref={Navigation.ref}>
    <Contexts>
      <HandleDeepLinking />
      <MainStack />
    </Contexts>
  </NavigationContainer>
)
