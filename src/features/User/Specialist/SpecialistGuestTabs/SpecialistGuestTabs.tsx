import React, { useCallback } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { SceneMap } from 'react-native-tab-view'

import {
  EUserSpecialistTabs,
  TSpecialistUserSpecialistGuestTabsProps,
} from './types'
import { Information, Works } from './ui'
import { TabBarComponent } from '@/shared/TabBarComponent'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { Reviews } from '../../Customer/JobReviews/ui'

export const SpecialistGuestTabs = ({
  ...props
}: TSpecialistUserSpecialistGuestTabsProps) => {
  const { t } = useTranslation()
  //Screen keys
  const homeTabBar = [
    { key: EUserSpecialistTabs.work, title: t('specialist_works') },
    {
      key: EUserSpecialistTabs.information,
      title: t('specialist_information'),
    },
    { key: EUserSpecialistTabs.reviews, title: t('customer_reviews') },
  ]

  // Define the scenes outside the component
  const worksScene = useCallback(
    () => <Works isEdit={props.isEdit} _id={props.user?._id} />,
    [props],
  )
  const informationScene = useCallback(
    () => <Information {...props} />,
    [props],
  )
  const reviewScene = useCallback(
    () => <Reviews _id={props.user?._id} />,
    [props],
  )

  //Screen list
  const renderScene = SceneMap({
    [EUserSpecialistTabs.work]: worksScene,
    [EUserSpecialistTabs.information]: informationScene,
    [EUserSpecialistTabs.reviews]: reviewScene,
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
    width: Dimensions.get('window').width * 0.33,
  },
})
