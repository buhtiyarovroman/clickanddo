import React, { useTransition } from 'react'
import { TNotificationsCardContentProps } from './types'
import {
  EPushType,
  TPushActionEnum,
} from '@/app/contexts/PushNotification/types'
import { useGetProjectById } from '@/features/Projects/hooks'
import { Button } from '@/shared/ui/button'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { styles } from './styled'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'

export const Content = ({
  action,
  id,
  type,
}: TNotificationsCardContentProps) => {
  const { t } = useTranslation()
  const { project, onChangeStatus } = useGetProjectById({ id: id || '' })
  const isPersonalProject = action === TPushActionEnum.created_personal_project
  const isProject = type === EPushType.project
  const isProjectStatusPending = project?.status === 'pending-specialist'

  return (
    <>
      {isProject && isPersonalProject && isProjectStatusPending && (
        <FlexWrapper justify={'space-between'}>
          <Button.Standard
            mTop={'16px'}
            width={'47%'}
            color={EColors.black}
            onPress={() => onChangeStatus(EProjectTypes.in_progress, id)}
            text={t('take_the_job')}
          />

          <Button.Standard
            mTop={'16px'}
            width={'47%'}
            style={styles.button}
            color={EColors.transparent}
            textColor={EColors.black}
            onPress={() =>
              onChangeStatus(EProjectTypes.rejected_by_specialist, id)
            }
            text={t('refuse')}
          />
        </FlexWrapper>
      )}
    </>
  )
}
