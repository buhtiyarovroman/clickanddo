import React from 'react'
import { useTranslation } from 'react-i18next'
import { TUserSpecialistPublicationsProps } from './types'

import { RenderPublication } from '../RenderPublication'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

export const SkillBox = ({
  isEdit = false,
  withTitle = true,
  _id,
  hideIfEmpty,
  title,
}: TUserSpecialistPublicationsProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const onPressAdd = () => {
    navigate(EScreens.ListCreateSkillBox)
  }

  return (
    <>
      <RenderPublication
        ownerId={_id}
        isEdit={isEdit}
        type={'skillbox'}
        title={withTitle ? title || t('skill_box') : ''}
        emptyIcon={'SkillBoxEmpty'}
        emptyText={t('empty.user.skill_box')}
        onAddPress={onPressAdd}
        hideIfEmpty={hideIfEmpty}
      />
    </>
  )
}
