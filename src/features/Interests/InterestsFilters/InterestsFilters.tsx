import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import { HashtagContainer } from '@/features/Projects/Hashtags/styled'
import { UserService } from '@/entities/User/services'
import { TInterest } from '@/entities/Interests/models/common'
import { TInterestsFiltersProps } from './types'
import { EColors } from '@/shared/ui/Styled'
import { Input } from '@/shared/ui/input'
import { getTranslate } from '@/shared/utils'
import {
  FlexWrapper,
  H3SemiBold,
  MRegular,
  SRegular,
} from '@/shared/ui/Styled/Styled'

export const InterestsFilters = ({
  interest = [],
  onChange = () => {},
  error = '',
  limit = 10,
}: TInterestsFiltersProps) => {
  const { t } = useTranslation()
  const [value, setInput] = useState('')
  const [localData, setLocalDate] = useState<TInterest[]>([])
  const ids = interest.map(item => item._id)
  const isLimit = limit ? interest.length === limit : false

  const searchInterests = async () => {
    try {
      const response = await UserService.getInterests({
        title: value,
        limit,
      })
      setLocalDate(response.data.docs)
    } catch (err) {
      console.log('onGetHashtag err =>', err)
    }
  }

  const onFilter = () => localData.filter(item => !ids.includes(item._id))

  const onDelete = (id: string) => {
    onChange(interest.filter(item => item._id !== id))
  }

  const onSelect = (item: TInterest) => {
    setInput('')
    onChange([...interest, item])
  }

  const renderInterest = (item: TInterest) => (
    <HashtagContainer key={item._id} onPress={() => onSelect(item)}>
      <SRegular>{getTranslate(item.title)}</SRegular>
    </HashtagContainer>
  )

  useEffect(() => {
    const debouncedSearchInterests = _.debounce(() => searchInterests(), 800)

    debouncedSearchInterests()
    return () => {
      debouncedSearchInterests.cancel()
    }
  }, [value])

  return (
    <>
      <H3SemiBold mBottom={'12px'}>{t('interests')}</H3SemiBold>

      <MRegular mBottom={'16px'} color={EColors.grey_700}>
        {t('select_interest_in_project')}
      </MRegular>

      <Input.Hashtag
        value={interest}
        inputValue={value}
        onChangeInput={setInput}
        leftIcon={'Search'}
        leftIconProps={{ size: 28 }}
        placeholder={t('search')}
        onDelete={onDelete}
        limit={limit}
      />
      {error && <SRegular color={EColors.error}>{error}</SRegular>}

      {!isLimit && (
        <FlexWrapper
          mTop={'16px'}
          wrap={'wrap'}
          justify={'flex-start'}
          align={'flex-start'}>
          {onFilter().map(renderInterest)}
        </FlexWrapper>
      )}
    </>
  )
}
