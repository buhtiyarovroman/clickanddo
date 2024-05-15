import React from 'react'
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view'
import { Dimensions, StyleSheet } from 'react-native'
import { TTypeBarComponents } from './types'
import { EColors } from '../ui/Styled'

type State = NavigationState<{
  key: string
  title: string
}>

export const TabBarComponent = ({
  routes,
  renderScene,
  tabStyle = {
    width: Dimensions.get('window').width * 0.5 - 20,
  },
  activeTab = 0,
}: TTypeBarComponents) => {
  const [index, onIndexChange] = React.useState(activeTab)

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State },
  ) => (
    <TabBar
      {...props}
      pressColor={'transparent'}
      android_ripple={{ radius: 0 }}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      activeColor={EColors.black}
      labelStyle={styles.label}
      tabStyle={tabStyle}
      pressOpacity={1}
    />
  )

  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={onIndexChange}
    />
  )
}

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: EColors.transparent,
  },
  indicator: {
    backgroundColor: EColors.black,
  },
  label: {
    textTransform: 'none',
    fontWeight: '600',
    color: EColors.grey_500,
  },
  tabStyle: {
    width: Dimensions.get('window').width * 0.32,
  },
})
