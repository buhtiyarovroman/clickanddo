import React, { useCallback, useState } from 'react'

import { EProfileCustomerTabs, TWidgetUserCustomer } from './types'

import {
  Tabs,
  TabBarProps,
  MaterialTabBar,
} from 'react-native-collapsible-tab-view'
import * as S from './styled'
import * as UI from './ui'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'

export const Customer = ({ isEdit = false, user }: TWidgetUserCustomer) => {
  const { t } = useTranslation()
  const [headerHeight, setHeaderHeight] = useState(0)
  const tabBar = useCallback(
    (props: TabBarProps<string>) => (
      <MaterialTabBar
        {...props}
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

  console.log('headerHeight =>', headerHeight)

  return (
    <S.Container>
      <Tabs.Container
        renderTabBar={tabBar}
        initialTabName={EProfileCustomerTabs.jobs}
        headerHeight={headerHeight}
        renderHeader={() => (
          <UI.Header getHeight={setHeaderHeight} user={user} {...{ isEdit }} />
        )}>
        <Tabs.Tab
          name={EProfileCustomerTabs.jobs}
          label={t('customer_projects')}
          key={1}>
          <UI.Jobs {...user} />
        </Tabs.Tab>

        <Tabs.Tab
          name={EProfileCustomerTabs.reviews}
          label={t('customer_reviews')}
          key={2}>
          <UI.Reviews {...user} />
        </Tabs.Tab>
      </Tabs.Container>
    </S.Container>
  )
}
