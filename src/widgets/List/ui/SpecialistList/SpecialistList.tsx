import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { EListTab } from './types'
import { SceneMap } from 'react-native-tab-view'
import { List } from '../List/List'
import { EPublicationType } from '@/entities/Publication/models'
import { TabBarComponent } from '@/shared/TabBarComponent'
import { StyleSheet, Dimensions, View } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export const SpecialistList = () => {
  const { t } = useTranslation()
  //Screen keys
  const homeTabBar = [
    {
      key: EListTab.publication,
      title: t(`favorites_filters.publications`),
    },
    // {
    //   key: EListTab.skillbox,
    //   title: t(`favorites_filters.skillbox`),
    // },
    // {
    //   key: EListTab.specialOffer,
    //   title: t(`favorites_filters.special_offers`),
    // },
  ]

  // Define the scenes outside the component
  const publicationScene = useCallback(
    () => <List type={EPublicationType.publication} />,
    [],
  )
  // const skillboxScene = useCallback(
  //   () => <List type={EPublicationType.skillbox} />,
  //   [],
  // )
  // const specialOfferScene = useCallback(
  //   () => <List type={EPublicationType.specialOffer} />,
  //   [],
  // )

  //Screen list
  const renderScene = SceneMap({
    [EListTab.publication]: publicationScene,
    // [EListTab.skillbox]: skillboxScene,
    // [EListTab.specialOffer]: specialOfferScene,
  })

  return (
    <View style={styles.tab_wrapper}>
      <TabBarComponent
        routes={homeTabBar}
        renderScene={renderScene}
        tabStyle={styles.tabStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tab_wrapper: {
    width: '100%',
    height: heightPercentageToDP(100),
    borderRadius: 22,
  },
  tabStyle: {
    width: Dimensions.get('window').width,
    // * 0.32,
  },
})
