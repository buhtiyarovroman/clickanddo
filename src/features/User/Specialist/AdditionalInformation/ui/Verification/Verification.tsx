import { FlexWrapper, LSemibold, MRegular } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TAddInfoVerificationProps } from './types'
import { AddChangeButtons } from '../AddChangeButtons'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'

export const Verification = ({
  isEdit,
  status = 'unverified',
}: TAddInfoVerificationProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const isShowEdit = status === 'rejected' || status === 'unverified'
  const isApproved = status === 'approved'

  const onEditNavigate = () => {
    navigate(EScreens.ProfileAddInfoVerification, { isEdit: true })
  }

  return (
    <>
      <FlexWrapper mBottom={'16px'} justify={'space-between'}>
        <LSemibold>{t('verification')}</LSemibold>

        {isEdit && isShowEdit && (
          <AddChangeButtons onEditPress={onEditNavigate} hideAdd />
        )}
      </FlexWrapper>

      <FlexWrapper justify={'flex-start'}>
        <MRegular mRight={'10px'} color={EColors.grey_900}>
          {t('proven')}:{' '}
          <MRegular mRight={'5px'} color={EColors.grey_600}>
            {t(`user_verification_statuses.${status}`)}
          </MRegular>
          {isApproved && <Icon size={16} name={'CheckCircle'} />}
        </MRegular>
      </FlexWrapper>
    </>
  )
}
