import * as S from './styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { LMedium } from '@/shared/ui/Styled/Styled'
import { TDateValueItemProps } from './types'
import { EDateValue } from '../../types'
import { Icon } from '@/shared/ui/Icon'

export const ValueItem = ({
  type = EDateValue.anyDate,
  onPress = () => {},
  isSelected = false,
}: TDateValueItemProps) => {
  const { t } = useTranslation()
  return (
    <S.Container onPress={() => onPress(type)}>
      <LMedium>{t(`date_value.${type}`)}</LMedium>

      {isSelected && <Icon name={'CheckedCircleBlack'} />}
    </S.Container>
  )
}
