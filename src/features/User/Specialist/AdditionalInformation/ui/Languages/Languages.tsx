import { EColors } from '@/shared/ui/Styled'
import { MRegular, Hr, FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TAddInfoLanguagesProps } from './types'
import { TUserLanguage } from '@/entities/User/models'
import { AddChangeButtons } from '../AddChangeButtons'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { levelData } from '@/shared/config/langLevel'
import { v4 as uuidv4 } from 'uuid'

export const Languages = ({
  languages = [],
  isEdit,
}: TAddInfoLanguagesProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const isVisible = !!languages.length || isEdit

  const renterLang = (item: TUserLanguage) => {
    return (
      <MRegular key={uuidv4()} color={EColors.grey_900}>
        {item.lang}:{' '}
        <MRegular color={EColors.grey_600}>
          {levelData.find(el => el.value === item.level)?.title || ''}
        </MRegular>
      </MRegular>
    )
  }

  const onEditNavigate = () => {
    navigate(EScreens.ProfileAddInfoLanguage, { isEdit: true })
  }

  return (
    <>
      {isVisible && (
        <>
          <FlexWrapper mBottom={'16px'} justify={'space-between'}>
            <LSemibold>{t('languages')}</LSemibold>

            {isEdit && (
              <AddChangeButtons onEditPress={onEditNavigate} hideAdd />
            )}
          </FlexWrapper>

          {/* Languages */}
          {languages.map(renterLang)}
        </>
      )}
    </>
  )
}
