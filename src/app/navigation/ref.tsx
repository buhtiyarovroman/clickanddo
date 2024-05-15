import {
  NavigationContainerRef,
  createNavigationContainerRef,
} from '@react-navigation/native'
import { EScreens } from './screens'
import { TScreens } from './types'

const navigationRef =
  createNavigationContainerRef<NavigationContainerRef<TScreens>>()

export const Navigation = {
  ref: navigationRef,
  navigate: (name: EScreens, params?: never) => {
    if (navigationRef.isReady()) {
      // @ts-ignore
      navigationRef.navigate(name, params)
    }
  },
}
