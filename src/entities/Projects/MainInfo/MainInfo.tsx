import React from 'react'
import { TProjectPreviewMainProps } from './types'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { HashtagDisplay } from '../HashtagDisplay'
import { ProfileTouchable, UserImage } from './styled'
import { useTranslation } from 'react-i18next'

export const MainInfo = ({
  name = '',
  description = '',
  hashtag = [],
  isCreate = false,
  owner,
  budget,
  currency,
  onGoProfile = () => {},
}: TProjectPreviewMainProps) => {
  const { t } = useTranslation()
  const { user, setting } = useTypedSelector(getUserSelector)

  const _onGoProfile = () => {
    if (!owner?._id) {
      console.error('no user id')

      return
    }

    onGoProfile(owner?._id)
  }
  return (
    <>
      <FlexWrapper flexDirection={'column'} align={'flex-start'}>
        {/* Project name */}
        <H3SemiBold mBottom={'10px'}>{name}</H3SemiBold>

        {!!budget && (
          <MRegular mBottom={'10px'}>
            {budget.toFixed(0)} {isCreate ? currency || '' : setting.currency}
          </MRegular>
        )}

        {!budget && (
          <MRegular mBottom={'10px'}>{t('price_negotiable')}</MRegular>
        )}
        {/* User avatar and name */}
        {!isCreate && (
          <ProfileTouchable onPress={_onGoProfile}>
            <UserImage type={'user'} source={owner?.photo} />

            <MRegular mLeft={'16px'}>
              {owner?.name || ''} {owner?.secondName || ''}
            </MRegular>
          </ProfileTouchable>
        )}

        {isCreate && (
          <FlexWrapper mBottom={'10px'} width={'auto'}>
            <UserImage type={'user'} source={user?.photo} />

            <MRegular mLeft={'16px'}>
              {user?.name || ''} {user?.secondName || ''}
            </MRegular>
          </FlexWrapper>
        )}

        <MRegular mBottom={'16px'} color={EColors.grey_500}>
          {description}
        </MRegular>
        {/* Hashtags */}
        <HashtagDisplay hashtag={hashtag} />
      </FlexWrapper>
    </>
  )
}
