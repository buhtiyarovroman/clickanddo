import React, { useRef } from 'react'
import i18next from 'i18next'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'
import { ProjectsService } from '@/entities/Projects/services'
import { getUserSelector } from '@/entities/User'
import { Button } from '@/shared/ui/button'
import { dateLocale } from '@/shared/utils'
import { TSelectItem } from '@/shared/ui/button/Select/types'
import { FlexWrapper, MSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { TProjectCardHeadProps } from './types'
import { EProjectCardType, EProjectTypes } from '../../types'
import { useNavigation } from '@/features/hooks'
import { EScreens, ETabStacks } from '@/app/navigation'
import { useDispatch } from 'react-redux'
import { projectsActions } from '@/entities/Projects/store'
import { formattingProjectData } from '@/features/Projects'
import { BottomSheet } from '@/widgets/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const Head = ({
  type = EProjectCardType.active,
  project,
  setProjects = () => {},
  showDates = false,
  hideCreatedAt = false,
}: TProjectCardHeadProps) => {
  const { t } = useTranslation()
  const { user, setting } = useTypedSelector(getUserSelector)
  const isActive = type === EProjectCardType.active
  const isHold = project?.status === 'hold'
  const isPendingSpecialist = project?.status === 'pending-specialist'

  const { navigate } = useNavigation()
  const reportRef = useRef<TBottomSheetBaseRef | null>(null)
  const isMy = project?.owner?._id === user?._id || false

  const dispatch = useDispatch()

  const deleteProject = async (id: string) => {
    if (!project) {
      console.error('no project')

      return
    }

    try {
      const { status: responseStatus } = await ProjectsService.deleteProject(id)

      if (responseStatus === 200 && isMy) {
        setProjects(prev => prev.filter(el => el._id !== id))
      }
    } catch (err) {
      console.log('deleteProject err => ', err)
    }
  }
  const freezeProject = async (id: string, status?: EProjectTypes) => {
    const newStatus = status || EProjectTypes.hold
    if (!project) {
      console.error('no project')

      return
    }

    try {
      const { status: responseStatus } =
        await ProjectsService.patchProjectStatus({
          id: project._id,
          status: `${newStatus}`,
        })
      if (responseStatus === 200) {
        setProjects(prev => prev.filter(el => el._id !== id))
      }
    } catch (err) {
      console.log('freezeProject err =>', err)
    }
  }

  const editProject = () => {
    if (!project) {
      console.error('no project')

      return
    }
    dispatch(projectsActions.setProjectFields(formattingProjectData(project)))
    navigate(EScreens.ProjectCreateStack, {
      screen: EScreens.ProjectCreateFirst,
      params: { stack: ETabStacks.Projects },
    })
  }

  const reportProject = () => {
    reportRef.current?.open()
  }
  const reportProjectClose = () => {
    reportRef.current?.close()
  }

  const getOwnerProjectOptions = (): TSelectItem[] => {
    let commonOptions: TSelectItem[] = []
    if (!project) {
      console.error('no project')

      return []
    }

    if (project.status !== 'hold' && !project.origin) {
      commonOptions.push({
        title: t('freeze_project'),
        icon: 'Ice',
        type: 'primary',
        color: EColors.primary,
        onPress: () => freezeProject(project._id),
      })
    }

    if (project.status === 'hold') {
      commonOptions.push({
        title: t('unfreeze_project'),
        icon: 'Ice',
        type: 'primary',
        color: EColors.primary,
        onPress: () => freezeProject(project._id, EProjectTypes.searching),
      })
    }

    if (project.origin ? true : project.projectResponses.length === 0) {
      commonOptions.push(
        {
          title: t('edit_project'),
          type: 'custom',
          icon: 'PencelLine',
          onPress: () => editProject(),
        },
        {
          title: t('delete_project'),
          icon: 'Delete',
          type: 'custom',
          color: EColors.error,
          onPress: () => deleteProject(project._id),
        },
      )
    }

    return commonOptions
  }

  const projectOptions: TSelectItem[] = isMy
    ? getOwnerProjectOptions()
    : [
        {
          title: t('report_project'),
          icon: 'Warning',
          type: 'custom',
          color: EColors.error,
          onPress: () => reportProject(),
        },
      ]

  return (
    <>
      <FlexWrapper align={'flex-start'} justify={'space-between'}>
        <FlexWrapper
          align={'flex-start'}
          width={'auto'}
          flexDirection={'column'}>
          <MSemibold>{project?.name}</MSemibold>

          {!showDates && (
            <>
              {/* Price */}
              {!!project?.budget && (
                <SRegular mTop={'5px'}>
                  {(project?.budget || 0).toFixed(0)} {setting.currency}
                </SRegular>
              )}

              {!project?.budget && (
                <SRegular mTop={'5px'}>{t('price_negotiable')}</SRegular>
              )}
            </>
          )}
        </FlexWrapper>
        {(isActive || isHold) && !!projectOptions.length && (
          <Button.Select
            containerStyle={{ transform: [{ rotate: '90deg' }] }}
            items={projectOptions}
          />
        )}
      </FlexWrapper>

      <FlexWrapper mTop={'0px'} justify={'space-between'}>
        {isActive && !isHold && !hideCreatedAt && (
          <SRegular color={EColors.grey_500}>
            {format(
              new Date(project?.createdAt || new Date()),
              'MMM dd, yyyy, HH:mm',
              {
                locale: dateLocale[i18next.language],
              },
            )}
          </SRegular>
        )}

        {isPendingSpecialist && (
          <SRegular color={EColors.grey_500}>{t('special_offer')}</SRegular>
        )}
      </FlexWrapper>

      <BottomSheet.ReportProject
        reportedProjectId={project?._id}
        ref={reportRef}
        onClose={reportProjectClose}
      />
    </>
  )
}
