import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { Button } from '@/shared/ui/button'
import React, { useContext } from 'react'
import { THoldButtonsProps } from './types'
import { useTranslation } from 'react-i18next'
import { LoaderContext } from '@/app/contexts/Loader'
import { ProjectsService } from '@/entities/Projects/services'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@/features/hooks'
import { projectsActions } from '@/entities/Projects/store'
import { EScreens, ETabStacks } from '@/app/navigation'
import { formattingProjectData } from '@/features/Projects'
import { EColors } from '@/shared/ui/Styled'
import { styles } from './styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'

export const HoldButtons = ({
  project,
  onRefresh = () => {},
}: THoldButtonsProps) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)
  const { user } = useTypedSelector(getUserSelector)
  const dispatch = useDispatch()
  const { navigate } = useNavigation()
  const isMy = user?._id === project?.owner._id || false

  const isHold =
    project?.status === 'hold' || project?.status === 'rejected-by-specialist'

  const onChangeStatus = async () => {
    if (!project?._id) {
      console.error('no have id projects')
      return
    }
    try {
      setLoading(true)

      await ProjectsService.patchProjectStatus({
        id: project._id,
        status: `${EProjectTypes.searching}`,
      })

      onRefresh()
    } catch (err) {
      console.log('onChangeStatus err', err)
    } finally {
      setLoading(false)
    }
  }

  const onEdit = () => {
    if (!project) {
      console.error('no gave project data')
      return
    }

    dispatch(projectsActions.setProjectFields(formattingProjectData(project)))
    navigate(EScreens.ProjectCreateStack, {
      screen: EScreens.ProjectCreateFirst,
      params: { stack: ETabStacks.Projects },
    })
  }

  return (
    <>
      {isMy && isHold && (
        <FlexWrapper mTop={'16px'} flexDirection={'column'}>
          <Button.Standard
            mTop={'16px'}
            text={t('publish')}
            onPress={onChangeStatus}
          />

          <Button.Standard
            mTop={'16px'}
            color={EColors.transparent}
            textColor={EColors.black}
            style={styles.button}
            text={t('edit_project')}
            onPress={onEdit}
          />
        </FlexWrapper>
      )}
    </>
  )
}
