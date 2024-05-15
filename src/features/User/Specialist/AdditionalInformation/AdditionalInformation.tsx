import React from 'react'
import { TUserOfferProps } from './types'
import { FlexWrapper, H3SemiBold } from '@/shared/ui/Styled/Styled'

import { useTranslation } from 'react-i18next'
import { Components } from './ui'
import { Line } from './styled'
import { UserEntities } from '@/entities/User'
import { AddChangeButtons } from './ui/AddChangeButtons'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'
import { Button } from '@/shared/ui/button'

export const AdditionalInformation = ({
  isEdit = false,
  languages = [],
  education = [],
  work = [],
  anotherExperience = [],
  status,
  ...props
}: TUserOfferProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const isEmpty =
    !status &&
    !languages.length &&
    !education.length &&
    !work.length &&
    !anotherExperience.length

  const onEditNavigate = () => {
    navigate(EScreens.ProfileAddInfoLanguage, { isEdit: false })
  }

  return (
    <FlexWrapper
      mTop={'20px'}
      mBottom={'60px'}
      flexDirection={'column'}
      align={'flex-start'}
      {...props}>
      {isEmpty && (
        <>
          <UserEntities.Empty
            icon={'AditionalInfoEmpty'}
            title={t('empty.user.additional_info')}
          />
          <Button.Standard mTop={'16px'} text={t('edit')} />
        </>
      )}

      {!isEmpty && (
        <>
          <Components.Work {...{ work, isEdit }} />

          <Components.Education {...{ education, isEdit }} />

          <Components.Languages {...{ languages, isEdit }} />

          <Line />

          <Components.Verification {...{ status, isEdit }} />
        </>
      )}
    </FlexWrapper>
  )
}
