import { Background } from '@/shared/ui/background'
import React, { useCallback, useEffect } from 'react'
import { styles } from './styled'
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useRoute,
} from '@react-navigation/native'
import { EScreens, TJobStack } from '@/app/navigation'
import { StyleSheet, View } from 'react-native'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import { useGetProjectById } from '@/features/Projects/hooks'
import { Description } from '@/widgets/Projects/Description'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { useDispatch } from 'react-redux'
import { projectsActions } from '@/entities/Projects/store'
// import { ResponseCard } from '@/entities/Projects/ResponseCard'
// import { TResponseCardProps } from '@/entities/Projects/ResponseCard/types'
// import { EJobScreenTab } from './types'
// import { ProjectsWidgets } from '@/widgets/Projects'
// import { SceneMap } from 'react-native-tab-view'
// import { useTranslation } from 'react-i18next'

export const Job = () => {
  // const { t } = useTranslation()
  const { project } = useRoute<RouteProp<TJobStack, EScreens.JobMain>>().params
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const isFocused = useIsFocused()

  const { user } = useTypedSelector(getUserSelector)
  const {
    project: localProject,
    getProject,
    setProject,
  } = useGetProjectById({
    id: project._id,
  })

  const isCustomer = user?.role === 'customer'
  const isViewer = user?._id !== project?.owner._id

  useFocusEffect(
    useCallback(() => {
      setProject(project)

      // return () => KeyboardController.setDefaultMode()
    }, [project, setProject]),
  )

  useEffect(() => {
    isFocused &&
      !isCustomer &&
      isViewer &&
      dispatch(projectsActions.patchUserRequest({ id: project._id }))
  }, [dispatch, project._id, isCustomer, isFocused, isViewer])

  // const homeTabBar = [
  //   { key: EJobScreenTab.description, title: t('job_screen_tab.description') },
  //   {
  //     key: EJobScreenTab.responses,
  //     title: t('job_screen_tab.responses'),
  //   },
  //   { key: EJobScreenTab.specialists, title: t('job_screen_tab.specialists') },
  // ]

  // const getCurrentRoutes = () => {
  //   if (!isCustomer) {
  //     return homeTabBar.filter(el => el.key !== EJobScreenTab.specialists)
  //   }

  //   return homeTabBar
  // }

  const onGoProfile = useCallback(
    (userId: string) => {
      navigate(EScreens.JobProfile, { id: userId })
    },
    [navigate],
  )

  // Define the scenes outside the component
  // const projectsScene = useCallback(
  //   () => (
  //     <Description
  //       onGoProfile={onGoProfile}
  //       onRefresh={getProject}
  //       project={localProject}
  //     />
  //   ),
  //   [getProject, onGoProfile, localProject],
  // )
  // const descriptionScene = useCallback(
  //   () => (
  //     <ProjectsWidgets.Responses onRefresh={getProject} {...localProject} />
  //   ),
  //   [getProject, localProject],
  // )
  // const reviewScene = useCallback(() => {
  //   const params: TResponseCardProps = {
  //     photo: localProject?.specialist?.photo,
  //     name: localProject?.specialist?.name,
  //     secondName: localProject?.specialist?.secondName,
  //   }
  //   return (
  //     <View style={styles.spec}>
  //       {!!localProject?.specialist && (
  //         <ResponseCard
  //           {...params}
  //           disableDate
  //           onPressUser={() => onGoProfile(localProject.specialist._id)}
  //         />
  //       )}
  //     </View>
  //   )
  // }, [localProject?.specialist])

  //Screen list
  // const renderScene = SceneMap({
  //   [EJobScreenTab.description]: projectsScene,
  //   [EJobScreenTab.responses]: descriptionScene,
  //   [EJobScreenTab.specialists]: reviewScene,
  // })

  return (
    <>
      {/* <Header.Standard goBack title={t('project') as string} /> */}

      <Background.SafeArea style={styles.main} edges={['top', 'bottom']}>
        <View style={[styled.tab_wrapper]}>
          <Description
            onGoProfile={onGoProfile}
            onRefresh={getProject}
            project={localProject}
          />
        </View>
      </Background.SafeArea>
    </>
  )
}

const styled = StyleSheet.create({
  tab_wrapper: {
    width: '100%',
    height: heightPercentageToDP(100),
    borderRadius: 22,
  },
})
