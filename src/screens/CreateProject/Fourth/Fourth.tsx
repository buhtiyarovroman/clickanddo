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
import { TProjectsFourthFormRef } from '@/features/Projects/FourthForm/types'
import { convertValidData } from './helper'
import { projectsActions } from '@/entities/Projects/store'
import { EScreens } from '@/app/navigation'
import { useClearCreateProject } from '@/features/Projects/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'

export const Fourth = () => {
  const { t } = useTranslation()
  const ref = useRef<TProjectsFourthFormRef | null>(null)
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectCreateFourth>>()
      .params
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const [height, setHeight] = useState(0)
  const [valid, setValid] = useState(false)
  const { onClearNavigate } = useClearCreateProject(nav)

  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return

    const transformData = convertValidData(data)

    dispatch(projectsActions.setProjectFields(transformData))

    navigate(EScreens.ProjectPreviewScreen, nav)
  }

  return (
    <Background.SafeArea>
      <Header.Progress
        title={t('project_details')}
        isClose
        activeTextProgress
        page={3}
        count={3}
        onPressClose={onClearNavigate}
        needBackHandler
      />

      <Background.Scroll
        nestedScrollEnabled
        keyboardShouldPersistTaps={'handled'}
        extraHeight={50}
        contentContainerStyle={[styles.main]}
        pHorizontal={20}>
        <ProjectsFeatures.FourthForm
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
