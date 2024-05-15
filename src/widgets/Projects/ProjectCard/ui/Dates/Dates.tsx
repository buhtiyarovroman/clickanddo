import React from 'react'
import { useTranslation } from 'react-i18next'

import { FlexWrapper, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { TProjectCardDatesProps } from './types'
import { format, differenceInDays } from 'date-fns'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'

export const Dates = ({ relevantUntil, budget }: TProjectCardDatesProps) => {
  const { t } = useTranslation()
  const { setting } = useTypedSelector(getUserSelector)

  const isOneDay = relevantUntil
    ? differenceInDays(new Date(relevantUntil), new Date()) < 1
    : false

  const color = isOneDay ? EColors.error : undefined

  return (
    <FlexWrapper
      flexDirection={'column'}
      align={'flex-start'}
      justify={'space-between'}>
      {/* Price */}
      {!!budget && (
        <SRegular mTop={'5px'}>
          {t('desired_cost')}: {(budget || 0).toFixed(0)} {setting.currency}
        </SRegular>
      )}

      {!budget && <SRegular mTop={'5px'}>{t('price_negotiable')}</SRegular>}

      {relevantUntil && (
        <SRegular>
          {t('ad_relevance')}:{' '}
          <SRegular color={color}>
            {format(new Date(relevantUntil), 'dd.MM.yyyy')}
          </SRegular>
        </SRegular>
      )}
    </FlexWrapper>
  )
}
