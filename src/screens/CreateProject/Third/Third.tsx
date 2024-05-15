import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useRef, useState } from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@/features/hooks'
import { ProjectsFeatures } from '@/features/Projects'
import { TProjectsThirdFormRef } from '@/features/Projects/ThirdForm/types'
import { EScreens } from '@/app/navigation'
import { projectsActions } from '@/entities/Projects/store'
import { useClearCreateProject } from '@/features/Projects/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'

export const Third = () => {
  const { t } = useTranslation()
  const ref = useRef<TProjectsThirdFormRef | null>(null)
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectCreateThird>>()
      .params
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [height, setHeight] = useState(0)
  const [valid, setValid] = useState(false)
  const { onClearNavigate } = useClearCreateProject(nav)

  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return
    if (!data.name && !data.hashtag?.length && data.description) return

    dispatch(projectsActions.setProjectFields({ additionalService: data! }))

    navigate(EScreens.ProjectCreateFourth, nav)
  }

  return (
    <Background.SafeArea>
      <Header.Progress
        title={t('additional_services')}
        isClose
        activeTextProgress
        page={3}
        count={4}
        onPressClose={onClearNavigate}
      />

      <Background.Scroll contentContainerStyle={[styles.main]} pHorizontal={20}>
        <ProjectsFeatures.ThirdForm
          ref={ref}
          onChangeValid={setValid}
          pBottom={height}
        />
      </Background.Scroll>

      <CustomBottomBar getHeight={setHeight} disableShadow>
        <Button.Standard
          disabled={!valid}
          mTop={'16px'}
          text={t('next')}
          onPress={onNext}
        />
      </CustomBottomBar>
    </Background.SafeArea>
  )
}
