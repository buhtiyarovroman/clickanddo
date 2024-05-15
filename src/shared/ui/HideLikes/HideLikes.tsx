import React from 'react'
import { EColors, Styled } from '../Styled'
import { THideLikesProps } from './types'
import { useTranslation } from 'react-i18next'
import { Switch } from 'react-native'

export const HideLikes = ({ value, onChange }: THideLikesProps) => {
  const { t } = useTranslation()

  return (
    <Styled.FlexWrapper justify={'space-between'}>
      <Styled.FlexWrapper
        width={'auto'}
        align={'flex-start'}
        flexDirection={'column'}>
        <Styled.LSemibold mBottom={'4px'}>
          {t('new_publication.likes.title')}
        </Styled.LSemibold>

        <Styled.SRegular color={EColors.grey_600}>
          {t('new_publication.likes.subtitle')}
        </Styled.SRegular>
      </Styled.FlexWrapper>

      <Switch
        value={value}
        onValueChange={onChange}
        thumbColor={EColors.white}
        trackColor={{
          true: EColors.primary,
          false: EColors.grey_200,
        }}
      />
    </Styled.FlexWrapper>
  )
}
