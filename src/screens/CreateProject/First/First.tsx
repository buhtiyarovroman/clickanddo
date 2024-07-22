import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { ProjectsFeatures } from '@/features/Projects'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { TProjectsCreateFirstFormRef } from '@/features/Projects/FirstForm/types'
import { useDispatch } from 'react-redux'
import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { useClearCreateProject } from '@/features/Projects/hooks/useClearCreateProject/useClearCreateProject'
import { useTypedSelector } from '@/app/store'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'

export const First = () => {
  const { t } = useTranslation()
  const ref = useRef<TProjectsCreateFirstFormRef | null>(null)
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectCreateFirst>>()
      .params
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { onClearNavigate } = useClearCreateProject(nav)
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const isEdit = !!createProjects.id
  const [valid, setValid] = useState(false)

  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return

    dispatch(projectsActions.setProjectFields(data))

    navigate(EScreens.ProjectCreateSecond, nav)
  }

  useEffect(() => {
    if (!isEdit && !createProjects.specialist) {
      createProjects.specialist
      dispatch(projectsActions.clearProjectCreate())
    }
  }, [])

  return (
    <Background.SafeArea>
      <Header.Progress
        title={t('project_name')}
        isClose
        activeTextProgress
        page={1}
        count={3}
        onPressClose={onClearNavigate}
        needBackHandler
      />

      <Background.Scroll style={styles.main} pHorizontal={20}>
        <ProjectsFeatures.FirstForm ref={ref} onChangeValid={setValid} />
      </Background.Scroll>

      <CustomBottomBar disableShadow>
        <Button.Standard
          mTop={'16px'}
          text={t('next')}
          disabled={!valid}
          onPress={onNext}
        />
      </CustomBottomBar>
    </Background.SafeArea>
  )
}
