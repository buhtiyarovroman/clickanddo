import React from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { THomeHeadProps } from './types'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, H2, H2SemiBold } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import {
  FilterContainer,
  SearchLink,
  SearchLinkWrapper,
  SearchWrapper,
} from './styled'

export const HomeHead = ({ onFiltersPress }: THomeHeadProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)
  const isCustomer = user?.role === 'customer'
  const { navigate } = useNavigation()

  const onSearchPress = () => {
    navigate(EScreens.HomeSearch)
  }
  const handleFilters = () => {
    !!onFiltersPress && onFiltersPress()
  }

  return (
    <>
      <H2 mBottom={'24px'}>
        <Trans
          i18nKey={`hello_name`}
          values={{ name: `${user?.name || ''}` }}
          components={{ bold: <H2SemiBold /> }}
        />
      </H2>

      <FlexWrapper justify={'space-between'}>
        <SearchWrapper>
          <Input.Search
            disabled
            label={t('tag_search')}
            placeholder={t('search_by_category')}
          />
        </SearchWrapper>
        <SearchLinkWrapper>
          <SearchLink onPress={onSearchPress} />
        </SearchLinkWrapper>

        <FilterContainer onPress={isCustomer ? onSearchPress : handleFilters}>
          <Icon
            height={20}
            width={20}
            name={isCustomer ? 'SearchWhite' : 'Filter'}
            size={isCustomer ? 30 : 24}
          />
        </FilterContainer>
      </FlexWrapper>
    </>
  )
}
