import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, SRegular } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { TEmptyHashtag } from './types'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '../store'

export const EmptyHashtag = ({ onPress = () => {} }: TEmptyHashtag) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)
  const isSpecialist = user?.role === 'specialist'
  return (
    <FlexWrapper flexDirection={'column'}>
      <SRegular color={EColors.grey_500}>
        {t(isSpecialist ? 'no_hashtag' : 'no_hashtag_customer')}
      </SRegular>

      {isSpecialist && (
        <Button.Standard mTop={'16px'} text={t('add')} onPress={onPress} />
      )}
    </FlexWrapper>
  )
}
