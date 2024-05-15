import React from 'react'
import { TProjectPreviewAdditionalInfoProps } from './types'
import { FlexWrapper, LSemibold, MRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'

export const AdditionalInfo = ({
  address,
  endDate,
  startDate,
  relevantUntil,
}: TProjectPreviewAdditionalInfoProps) => {
  const { t } = useTranslation()

  return (
    <>
      {!!address && (
        <FlexWrapper
          mBottom={'16px'}
          flexDirection={'column'}
          align={'flex-start'}>
          <LSemibold mBottom={'5px'}>{t('address')}</LSemibold>

          <MRegular color={EColors.grey_600}>{address}</MRegular>
        </FlexWrapper>
      )}

      <FlexWrapper mBottom={'5px'} justify={'space-between'} wrap={'wrap'}>
        <LSemibold>{t('start_date_project')}</LSemibold>

        <MRegular color={EColors.grey_600}>
          {startDate
            ? format(new Date(startDate), 'dd.MM.yyyy')
            : t('soon_as_possible')}
        </MRegular>
      </FlexWrapper>

      {endDate && (
        <FlexWrapper mBottom={'5px'} justify={'space-between'}>
          <LSemibold>{t('end_date_project')}</LSemibold>

          <MRegular mLeft={'5px'} color={EColors.grey_600}>
            {format(new Date(endDate), 'dd.MM.yyyy')}
          </MRegular>
        </FlexWrapper>
      )}

      {relevantUntil && (
        <FlexWrapper mBottom={'5px'} justify={'space-between'}>
          <LSemibold>{t('relevance_date_project')}</LSemibold>

          <MRegular color={EColors.grey_600}>
            {format(new Date(relevantUntil), 'dd.MM.yyyy')}
          </MRegular>
        </FlexWrapper>
      )}
    </>
  )
}
