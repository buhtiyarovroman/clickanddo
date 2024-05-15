import { TScreens } from '@/navigation'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends TScreens {}
  }
}
