import React, { useCallback } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { SceneMap } from 'react-native-tab-view'

import { ECReviewTabs, TSpecialistUserJobReviewsProps } from './types'
import { Jobs, Reviews } from './ui'
import { TabBarComponent } from '@/shared/TabBarComponent'
import { heightPercentageToDP } from 'react-native-responsive-screen'

export const JobReviews = ({ ...props }: TSpecialistUserJobReviewsProps) => {
  const { t } = useTranslation()
  //Screen keys
  const homeTabBar = [
    { key: ECReviewTabs.Projects, title: t('customer_projects') },
    // {
    //   key: ECReviewTabs.Description,
    //   title: t('customer_description'),
    // },
    { key: ECReviewTabs.Reviews, title: t('customer_reviews') },
  ]

  // Define the scenes outside the component
  const projectsScene = useCallback(() => <Jobs {...props} />, [props])
  // const descriptionScene = useCallback(() => <About {...props} />, [props])
  const reviewScene = useCallback(() => <Reviews {...props} />, [props])
  // [ECReviewTabs.Description]: descriptionScene,

  //Screen list
  const renderScene = SceneMap({
    [ECReviewTabs.Projects]: projectsScene,
    [ECReviewTabs.Reviews]: reviewScene,
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
    // paddingBottom: 150,
    borderRadius: 22,
  },
  tabStyle: {
    width: Dimensions.get('window').width * 0.5,
  },
})
