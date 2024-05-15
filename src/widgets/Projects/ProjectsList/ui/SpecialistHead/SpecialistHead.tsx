import React, { useRef } from 'react'
import { Trans, useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { THomeSpecialistHeadProps } from './types'
import { Input } from '@/shared/ui/input'
import { FlexWrapper, H2, H2SemiBold } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { FilterContainer } from './styled'

import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'
import { HashtagAccordion } from '@/widgets/HashtagAccordion'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { BottomSheet } from '@/widgets/bottomSheet'

export const SpecialistHead = ({
  selectedHashtag = [],
  setSelectedHashtag = () => {},
  filterData,
}: THomeSpecialistHeadProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)
  const isCustomer = user?.role === 'customer'

  const ref = useRef<TBottomSheetBaseRef | null>(null)

  const { foundHashTags, search, setSearch, onAddHashTag, loading } =
    useFindHashtags()

  const ids = selectedHashtag.map(item => item._id)

  const searchableHashtag = foundHashTags.filter(el => !ids.includes(el._id))

  const onOpen = () => {
    ref.current?.open()
  }

  const onClose = () => {
    ref.current?.close()
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

      <FlexWrapper mTop={'16px'} mBottom={'16px'} flexDirection={'column'}>
        <FlexWrapper justify={'space-between'}>
          <Input.Search
            width={'80%'}
            value={search}
            onChange={setSearch}
            label={t('tag_search')}
            placeholder={t('search_by_category')}
          />

          <FilterContainer onPress={onOpen}>
            <Icon
              height={20}
              width={20}
              name={isCustomer ? 'SearchWhite' : 'Filter'}
              size={isCustomer ? 30 : 24}
            />
          </FilterContainer>
        </FlexWrapper>

        <HashtagAccordion
          loading={loading}
          onAddHashTag={onAddHashTag}
          searchableHashtag={searchableHashtag}
          selectedHashtag={selectedHashtag}
          setSelectedHashtag={setSelectedHashtag}
          setSearch={setSearch}
          setSearchableHashtag={() => {}}
          searchLength={search.length}
        />
      </FlexWrapper>

      <BottomSheet.HomeFilter ref={ref} {...{ filterData, onClose }} />
    </>
  )
}
