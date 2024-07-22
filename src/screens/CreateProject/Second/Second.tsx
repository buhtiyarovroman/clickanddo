import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useRef, useState } from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { useDispatch } from 'react-redux'
import { projectsActions } from '@/entities/Projects/store'
import { useNavigation } from '@/features/hooks'
import { TProjectsSecondFormRef } from '@/features/Projects/SecondForm/types'
import { ProjectsFeatures } from '@/features/Projects'
import { EScreens } from '@/app/navigation'
import { useClearCreateProject } from '@/features/Projects/hooks/useClearCreateProject/useClearCreateProject'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'
import { RouteProp, useRoute } from '@react-navigation/native'

export const Second = () => {
  const { t } = useTranslation()
  const ref = useRef<TProjectsSecondFormRef | null>(null)
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectCreateSecond>>()
      .params
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const { onClearNavigate } = useClearCreateProject(nav)
  const [height, setHeight] = useState(0)
  const [valid, setValid] = useState(false)

  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return

    dispatch(
      projectsActions.setProjectFields({
        ...data,
        images: data.images.map(item => item.path),
      }),
    )

    navigate(EScreens.ProjectCreateFourth, nav)
  }

  return (
    <Background.SafeArea>
      <Header.Progress
        title={t('description')}
        isClose
        activeTextProgress
        page={2}
        count={3}
        needBackHandler
        onPressClose={onClearNavigate}
      />

      <Background.Scroll contentContainerStyle={[styles.main]} pHorizontal={20}>
        <ProjectsFeatures.SecondForm
          isEdit
          ref={ref}
          pBottom={height}
          onChangeValid={setValid}
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
