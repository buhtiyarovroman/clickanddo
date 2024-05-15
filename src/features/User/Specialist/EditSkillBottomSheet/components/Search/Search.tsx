import { FlexWrapper, SRegular } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SkillItem, SearchContainer } from './styled'
import { Input } from '@/shared/ui/input'
import { THashTag } from '@/entities/User/models'
import { getTranslate } from '@/shared/utils'
import { TSearchSkills } from './types'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'
import { Loader } from '@/shared/ui/loader'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'
import { HashtagItem } from '@/shared/ui/HashtagItem'

export const Search = ({
  mySkills = [],
  onSelect = () => {},
  onClose = () => {},
}: TSearchSkills) => {
  const { search, setSearch, onAddHashTag, foundHashTags, loading } =
    useFindHashtags()
  const { t } = useTranslation()
  const ids = mySkills.map(el => el._id)
  const currentHashtags = foundHashTags.filter(item => !ids.includes(item._id))

  const renderSkills = (item: THashTag) => {
    return <HashtagItem key={item._id} onPress={onSelect} {...item} />
  }

  const renderLoading = () => {
    return (
      <FlexWrapper>
        <Loader.Standard />
      </FlexWrapper>
    )
  }

  const _onClose = () => {
    setSearch('')
    onClose()
  }

  return (
    <>
      <Input.Standard
        value={search}
        onChange={setSearch}
        label={t('skills_search')}
        mBottom={'16px'}
        rightIcon={'Close'}
        rightIconProps={{
          stroke: EColors.grey_500,
        }}
        onPressRightIcon={_onClose}
      />

      <SearchContainer>
        {!!currentHashtags.length && currentHashtags.map(renderSkills)}

        {loading && renderLoading()}

        {!loading && !currentHashtags.length && search && (
          <EmptyHashtag onPress={onAddHashTag} />
        )}
      </SearchContainer>
    </>
  )
}
