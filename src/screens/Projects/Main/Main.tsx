import { Background } from '@/shared/ui/background'
import { Header } from '@/widgets/header'
import React from 'react'
import { styles } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { ProjectsWidgets } from '@/widgets/Projects'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/features/hooks'
import { EScreens, ETabStacks } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useDispatch } from 'react-redux'
import { projectsActions } from '@/entities/Projects/store'

export const Main = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const { user } = useTypedSelector(getUserSelector)

  const isCustomer = user?.role === 'customer'

  const onGoCreate = () => {
    dispatch(projectsActions.clearProjectCreate())
    navigate(EScreens.ProjectCreateStack, {
      screen: EScreens.ProjectCreateFirst,
      params: { stack: ETabStacks.Projects },
    })
  }
  return (
    <>
      <Header.DrawerIcons
        title={t('my_projects')}
        rightIcon={isCustomer ? 'Plus' : undefined}
        rightIconProps={{ stroke: EColors.black }}
        onPressRightIcon={onGoCreate}
      />

      <Background.Standard style={styles.main} pHorizontal={20}>
        {/* Category list */}
        <ProjectsWidgets.List />
      </Background.Standard>
    </>
  )
}
