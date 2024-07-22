import React, { useCallback } from 'react'
import * as S from './styled'
import {
  Tabs,
  TabBarProps,
  MaterialTabBar,
  MaterialTabItem,
  MaterialTabItemProps,
} from 'react-native-collapsible-tab-view'
import { EColors } from '../Styled'
import { TCollapsibleTabViewData, TCollapsibleTabViewProps } from './types'

export const CollapsibleTabView = ({
  data = [],
  headerHeight = 0,
  initialTabName = '',
  renderHeader = () => <></>,
}: TCollapsibleTabViewProps) => {
  const renderTabItem = (props: MaterialTabItemProps<string>) => (
    <MaterialTabItem {...props} android_ripple={{ radius: 0 }} />
  )

  const tabBar = useCallback(
    (props: TabBarProps<string>) => (
      <MaterialTabBar
        {...props}
        TabItemComponent={renderTabItem}
        inactiveColor={EColors.black}
        activeColor={EColors.primary}
        labelStyle={S.styles.label}
        indicatorStyle={[S.styles.indicator]}
        tabStyle={S.styles.tabBar}
        style={[S.styles.tabBar]}
      />
    ),
    [S],
  )

  const renderTabs = ({ Component, ...item }: TCollapsibleTabViewData) => (
    <Tabs.Tab {...item}>{Component}</Tabs.Tab>
  )
  return (
    <Tabs.Container
      renderTabBar={tabBar}
      initialTabName={initialTabName}
      headerHeight={headerHeight}
      renderHeader={renderHeader}>
      {data.map(renderTabs)}
    </Tabs.Container>
  )
}
