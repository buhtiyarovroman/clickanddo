import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { StackNavigationOptions } from '@react-navigation/stack'
import { Platform } from 'react-native'

export const ScreenNavigationOptions: StackNavigationOptions = {
  headerShown: false,
  presentation: 'transparentModal',
  animationEnabled: true,
}

export const ScreenNavigationOptionsNative: NativeStackNavigationOptions = {
  headerShown: false,
  animation: Platform.OS === 'ios' ? 'slide_from_left' : 'slide_from_right',
}
