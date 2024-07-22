import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui/input'
import { THashTag } from '@/entities/User/models'
import { TSearchSkills } from './types'
import { EColors } from '@/shared/ui/Styled'
import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'
import { Loader } from '@/shared/ui/loader'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'
import { HashtagItem } from '@/shared/ui/HashtagItem'
import { FlatList, ListRenderItem } from 'react-native'
import * as S from './styled'

export const Search = ({
  mySkills = [],
  onSelect = () => {},
  onClose = () => {},
}: TSearchSkills) => {
  const {
    search,
    setSearch,
    onAddHashTag,
    foundHashTags,
    loading,
    ...paginationProps
  } = useFindHashtags()
  const { t } = useTranslation()
  const ids = mySkills.map(el => el._id)
  const currentHashtags = foundHashTags.filter(item => !ids.includes(item._id))

  const renderSkills: ListRenderItem<THashTag> = ({ item }) => (
    <HashtagItem key={item._id} onPress={onSelect} {...item} />
  )

  const _onClose = () => {
    setSearch('')
    onClose()
  }

  const onGetMore = () => {
    if (paginationProps.canGetMoreItems && !loading) {
      paginationProps.getMore()
    }
  }

  const renderLoading = () => {
    if (loading) {
      return <Loader.Standard />
    }
    return <></>
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

      <S.SearchContainer>
        {!!currentHashtags.length && (
          <S.ListContainer>
            <FlatList
              nestedScrollEnabled
              data={currentHashtags}
              contentContainerStyle={S.styles.list}
              renderItem={renderSkills}
              onEndReached={onGetMore}
            />
            {loading && renderLoading()}
          </S.ListContainer>
        )}

        {!loading && !currentHashtags.length && search && (
          <EmptyHashtag onPress={onAddHashTag} />
        )}
      </S.SearchContainer>
    </>
  )
}
