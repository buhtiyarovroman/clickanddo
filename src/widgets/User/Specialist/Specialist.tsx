import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { UserSpecialistFeatures } from '@/features/User/Specialist'
import { LSemibold, MRegular } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TWidgetUserSpecialist } from './types'

export const Specialist = ({ isEdit = false, user }: TWidgetUserSpecialist) => {
  const { user: userMe } = useTypedSelector(getUserSelector)
  const { t } = useTranslation()

  return (
    <>
      {/* User Main info (photo, likes, subscribers)*/}
      <UserSpecialistFeatures.UserInfo {...user} {...{ isEdit }} />

      {/* User description */}
      <UserSpecialistFeatures.Description {...user} {...{ isEdit }} />

      {/* Specialist skills */}
      <UserSpecialistFeatures.Skills hashtag={user?.hashtag} {...{ isEdit }} />

      <LSemibold mBottom={'10px'}>{t('address')}</LSemibold>
      <MRegular>{user?.country}</MRegular>
      {user?._id !== userMe?._id && (
        <>
          {/* Publications */}
          <UserSpecialistFeatures.Publications {...user} {...{ isEdit }} />

          {/* Special offers */}
          <UserSpecialistFeatures.SpecialOffers {...user} {...{ isEdit }} />

          {/* Skillboxes */}
          <UserSpecialistFeatures.SkillBox {...user} {...{ isEdit }} />
        </>
      )}
      {/* Reviews */}
      <UserSpecialistFeatures.JobReviews {...user} {...{ isEdit }} />

      <UserSpecialistFeatures.AdditionalInformation {...{ isEdit }} {...user} />
    </>
  )
}
