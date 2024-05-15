import { StyleProp, ViewStyle } from 'react-native'
import { SceneRendererProps } from 'react-native-tab-view'

type SceneProps = {
  route: unknown
} & Omit<SceneRendererProps, 'layout'>

export type TTypeBarComponents = {
  renderScene: ({ route, jumpTo, position }: SceneProps) => JSX.Element
  tabStyle?: StyleProp<ViewStyle>
  routes: TRoutesTabComponenst[]
  activeTab?: number
}

export type TRoutesTabComponenst = {
  key: string
  title: string
}
