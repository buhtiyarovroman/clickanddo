import React from 'react'
import { useTranslation } from 'react-i18next'

import { RenderPublication } from '../RenderPublication'
import { TUserSpecialistPublicationsProps } from './types'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

export const Publications = ({
  isEdit = false,
  _id,
  hideIfEmpty,
  title,
  disableTitle = false,
  onNavigatePress,
}: TUserSpecialistPublicationsProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const onPressAdd = () => {
    navigate(EScreens.ListCreatePublication)
  }

  return (
    <>
      <RenderPublication
        ownerId={_id}
        isEdit={isEdit}
        type={'publication'}
        title={!disableTitle ? title || t('publications') : ''}
        emptyIcon={'PublicationEmpty'}
        emptyText={t('empty.user.publication')}
        onAddPress={onPressAdd}
        hideIfEmpty={hideIfEmpty}
        onNavigatePress={onNavigatePress}
      />
    </>
  )
}
