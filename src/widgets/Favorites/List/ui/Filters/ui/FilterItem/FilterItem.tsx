import React from 'react'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Container } from './styles'
import { TFilterItem } from './types'
import { useTranslation } from 'react-i18next'

export const FilterItem = ({
  onPress,
  isActive,
  isFirst = false,
  filter,
}: TFilterItem) => {
  const { t } = useTranslation()
  return (
    <Container isFirst={isFirst} isActive={isActive} onPress={onPress}>
      <MRegular color={isActive ? EColors.white : EColors.grey_800}>
        {t(`favorites_filters.${filter}`)}
      </MRegular>
    </Container>
  )
}
