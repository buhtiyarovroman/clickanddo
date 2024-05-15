import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React from 'react'
import { styles } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/features/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TProjectsStack } from '@/app/navigation/stacks/Projects'
import { EScreens } from '@/app/navigation'

import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'

import { ProjectsWidgets } from '@/widgets/Projects'

export const ProjectResponses = () => {
  const { t } = useTranslation()
  const { goBack } = useNavigation()
  const { id, name, specialist } =
    useRoute<RouteProp<TProjectsStack, EScreens.ProjectResponses>>().params

  return (
    <>
      <Header.CenterTitle
        goBack
        title={t('responses')}
        rightIcon={'Close'}
        rightIconProps={{ stroke: EColors.black, size: 20 }}
        onPressRightIcon={goBack}
      />

      <Background.Standard style={[styles.main, { paddingBottom: TAB_HEIGHT }]}>
        <ProjectsWidgets.ResponsesProjectList
          id={id}
          projectName={name}
          projectSpecialist={specialist}
        />
      </Background.Standard>
    </>
  )
}
