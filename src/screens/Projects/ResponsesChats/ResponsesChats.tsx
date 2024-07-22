import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useCallback } from 'react'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/features/hooks'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { StyleSheet, Dimensions } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import { EProjectResponsesChatsTabs } from './types'
import { TabBarComponent } from '@/shared/TabBarComponent'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { ProjectsWidgets } from '@/widgets/Projects'
import { EScreens, TJobStack } from '@/app/navigation'
import { RouteProp, useRoute } from '@react-navigation/native'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const ResponsesChats = () => {
  const { t } = useTranslation()
  const { goBack } = useNavigation()
  const { user } = useTypedSelector(getUserSelector)

  const isCustomer = user?.role === 'customer'

  const { id, title, specialist } =
    useRoute<RouteProp<TJobStack, EScreens.JobResponsesChats>>().params

  const homeTabBar = [
    {
      key: EProjectResponsesChatsTabs.chats,
      title: t(`message`),
    },
    {
      key: EProjectResponsesChatsTabs.responses,
      title: t('response'),
    },
  ]

  const responsesScene = useCallback(
    () => (
      <>
        <ProjectsWidgets.ResponsesProjectList
          id={id}
          projectName={title}
          projectSpecialist={specialist}
          hideTitle
        />
      </>
    ),
    [],
  )

  const chatScene = useCallback(
    () => (
      <>
        <ProjectsWidgets.ProjectChats projectId={id} />
      </>
    ),
    [],
  )

  const renderScene = SceneMap({
    [EProjectResponsesChatsTabs.chats]: chatScene,
    [EProjectResponsesChatsTabs.responses]: responsesScene,
  })

  return (
    <>
      <Header.CenterTitle
        goBack
        title={title}
        rightIcon={'Close'}
        rightIconProps={{ stroke: EColors.black, size: 20 }}
        onPressRightIcon={goBack}
      />

      <Background.Standard
        style={[styles.tab_wrapper, { paddingBottom: TAB_HEIGHT }]}>
        {isCustomer && (
          <TabBarComponent
            routes={homeTabBar}
            renderScene={renderScene}
            tabStyle={styles.tabStyle}
            activeTab={0}
          />
        )}

        {!isCustomer && <ProjectsWidgets.ProjectChats projectId={id} />}
      </Background.Standard>
    </>
  )
}

const styles = StyleSheet.create({
  tab_wrapper: {
    width: '100%',
    height: heightPercentageToDP(100),
  },
  tabStyle: {
    width: Dimensions.get('window').width * 0.5,
  },
})
