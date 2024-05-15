import { StackNavigationProp } from '@react-navigation/stack'
import { useNavigation as useOriginalNavigation } from '@react-navigation/native'
import { TScreens } from '@/app/navigation'

type ExtendedNavigationProp = StackNavigationProp<TScreens>

// Custom hook that provides the extended navigation prop
export const useNavigation = (): ExtendedNavigationProp => {
  const navigation = useOriginalNavigation<ExtendedNavigationProp>()

  // Define the 'push' method
  const push = (screen: keyof TScreens, params?: TScreens[keyof TScreens]) => {
    navigation.push(screen, params)
  }

  return { ...navigation, push }
}
