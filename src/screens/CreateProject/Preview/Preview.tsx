import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React from 'react'
import { ProjectsWidgets } from '@/widgets/Projects'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'
import { styles } from './styled'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'

export const Preview = () => {
  const { t } = useTranslation()
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const { navigate } = useNavigation()
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectPreviewScreen>>()
      .params

  const onNavigateSuccess = (isDraft: boolean, isSpecialist: boolean) => {
    navigate(EScreens.ProjectCreateSuccess, {
      ...nav,
      isDraft,
      isSpecialist,
    })
  }

  return (
    <>
      <Header.Progress title={t('my_projects')} hideProgress />

      <Background.Scroll style={styles.main}>
        <ProjectsWidgets.Preview
          onSuccess={onNavigateSuccess}
          {...createProjects}
        />
      </Background.Scroll>
    </>
  )
}
