import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React, { useContext, useRef, useState } from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { ProjectsFeatures } from '@/features/Projects'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { Button } from '@/shared/ui/button'
import { getProjectsSelector } from '@/entities/Projects/store'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'
import { TProjectsCreatePersonalFormRef } from '@/features/Projects/PersonalForm/types'
import { ProjectEntities } from '@/entities/Projects'
import { addDays } from 'date-fns'
import { LoaderContext } from '@/app/contexts/Loader'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'

export const Personal = () => {
  const { t } = useTranslation()
  const ref = useRef<TProjectsCreatePersonalFormRef | null>(null)
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectCreateFirst>>()
      .params
  const { navigate } = useNavigation()
  const [height, setHeight] = useState(0)
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const { setLoading } = useContext(LoaderContext)

  const onNext = async () => {
    const data = await ref.current?.getForm()

    if (!data) return

    try {
      setLoading(true)

      console.log('request =>', data.currency)

      const response = await ProjectEntities.ProjectsService.postProject({
        name: data.name,
        budget: data.budget,
        currency: data.currency,
        description: data.description,
        startDate: data.startDate,
        specialist: createProjects.specialist,
        projectResponses: createProjects.projectResponses,
        status: EProjectTypes.pending_specialist,
        relevantUntil: addDays(
          new Date(data.startDate || new Date()),
          10,
        ).toString(),
        ...(data.location?.length
          ? {
              location: {
                type: 'Point',
                coordinates: data.location || [],
              },
            }
          : {}),
        hashtag: createProjects.hashtag.map(el => el._id),
      })

      if (data.images.length !== 0) {
        await ProjectEntities.ProjectsService.patchProjectImage({
          id: response.data._id,
          images: data.images.map(el => el.path),
          oldImages: [],
        })
      }

      navigate(EScreens.ProjectCreateSuccess, nav)
    } catch (error) {
      console.log('onCreatePersonal error =>', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Background.SafeArea>
      <Header.CenterTitle title={t('project_name')} goBack />

      <Background.Scroll
        nestedScrollEnabled
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={{ paddingBottom: height + 30 }}
        style={styles.main}
        pHorizontal={20}>
        <ProjectsFeatures.PersonalForm ref={ref} />
      </Background.Scroll>

      <CustomBottomBar disableShadow getHeight={setHeight}>
        <Button.Standard
          mTop={'16px'}
          text={t('next')}
          // disabled={!valid}
          onPress={onNext}
        />
      </CustomBottomBar>
    </Background.SafeArea>
  )
}
