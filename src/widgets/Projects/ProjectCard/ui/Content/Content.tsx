import React from 'react'

import { TProjectCardContentProps } from './types'
import { ResponsesSeen } from '@/entities/Projects/ResponsesSeen'
import { ProjectsFeatures } from '@/features/Projects'
import { EProjectCardType } from '../../types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { MSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'

export const Content = ({
  disableButtons = false,
  projectResponses = [],
  views = 0,
  type,
  address,
  ...props
}: TProjectCardContentProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)

  const isCustomer = user?.role === 'specialist'
  const isActive = isCustomer ? type === EProjectCardType.active : false
  return (
    <>
      {isActive && (
        <>
          <MSemibold mTop={'5px'}>{t('address')}</MSemibold>

          <SRegular numberOfLines={1} color={EColors.grey_500}>
            {address || t('remote_work')}
          </SRegular>
        </>
      )}
      {!isActive && (
        <ResponsesSeen projectResponses={projectResponses} views={views} />
      )}

      {!disableButtons && <ProjectsFeatures.ProjectCardButtons {...props} />}
    </>
  )
}
