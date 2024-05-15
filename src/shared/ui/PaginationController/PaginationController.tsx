import React from 'react'
import { TPaginationControllerProps } from './types'
import { FlexWrapper, MRegular } from '../Styled/Styled'
import { ActiveButton } from './styled'
import { Icon } from '../Icon'
import { useTranslation } from 'react-i18next'
import { EColors } from '../Styled'

export const PaginationController = ({
  page = 1,
  totalPages = 2,
  onPressNext = () => {},
  onPressPrevious = () => {},
  ...props
}: TPaginationControllerProps) => {
  const { t } = useTranslation()
  return (
    <FlexWrapper {...props}>
      <ActiveButton onPress={onPressPrevious} disabled={page === 1} isLeft>
        <Icon stroke={EColors.primary_D2} size={20} name={'PagingArrowLeft'} />
        <MRegular mLeft={'12px'} color={EColors.primary_D2}>
          {t('previous')}
        </MRegular>
      </ActiveButton>

      <FlexWrapper width={'auto'}>
        <MRegular>
          {page} {t('of')} {totalPages}
        </MRegular>
      </FlexWrapper>

      <ActiveButton onPress={onPressNext} disabled={page === totalPages}>
        <MRegular mRight={'12px'} color={EColors.primary_D2}>
          {t('next')}
        </MRegular>
        <Icon name={'PagingArrowRight'} size={20} stroke={EColors.primary_D2} />
      </ActiveButton>
    </FlexWrapper>
  )
}
