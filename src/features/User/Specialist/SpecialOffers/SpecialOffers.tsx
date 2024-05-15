import React from 'react'
import { useTranslation } from 'react-i18next'
import { TUserSpecialistPublicationsProps } from './types'
import { RenderPublication } from '../RenderPublication'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'

export const SpecialOffers = ({
  isEdit = false,
  withTitle = true,
  _id,
  hideIfEmpty,
  title,
}: TUserSpecialistPublicationsProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const onPressAdd = () => {
    navigate(EScreens.ListSpecialOffer)
  }

  return (
    <RenderPublication
      ownerId={_id}
      isEdit={isEdit}
      type={'special-offer'}
      title={withTitle ? title || t('offer.title') : ''}
      emptyIcon={'SpecialOffersEmpty'}
      emptyText={t('empty.user.special_offers')}
      onAddPress={onPressAdd}
      hideIfEmpty={hideIfEmpty}
    />
  )
}
