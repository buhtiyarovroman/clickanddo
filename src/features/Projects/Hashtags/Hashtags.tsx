import React, { useEffect } from 'react'
import { TProjectCreateSecondHashtagProps } from './types'
import {
  FlexWrapper,
  H3SemiBold,
  MRegular,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { Input } from '@/shared/ui/input'
import { THashTag } from '@/entities/User/models'
import { HashtagItem } from '@/shared/ui/HashtagItem'
import { useFindHashtags } from '../hooks/useFindHashtags'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import * as S from './styled'
import { FlatList, ListRenderItem } from 'react-native'
import { Loader } from '@/shared/ui/loader'

export const Hashtags = ({
  hashtag = [],
  onChange = () => {},
  error = '',
  withTitle = true,
  limit,
  selectOnUserHashtags = false,
  hideSearchIcon = false,
}: TProjectCreateSecondHashtagProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)

  const {
    loading,
    search,
    setSearch,
    foundHashTags,
    onAddHashTag,
    fetchHashtags,
    ...paginationProps
  } = useFindHashtags()

  const ids = hashtag.map(item => item._id)

  const currentHashtag = selectOnUserHashtags
    ? user?.hashtag.filter(item => !ids.includes(item._id)) || []
    : foundHashTags.filter(item => !ids.includes(item._id))

  useEffect(() => {
    !selectOnUserHashtags && fetchHashtags(0)
  }, [])

  const isLimit = limit ? hashtag.length === limit : false

  const onDelete = (id: string) => {
    onChange(hashtag.filter(item => item._id !== id))
  }
  const onSelect = (item: THashTag) => {
    onChange([...hashtag, item])
  }

  const renderHashtag: ListRenderItem<THashTag> = ({ item }) => (
    <HashtagItem key={item._id} onPress={onSelect} {...item} />
  )
  const onGetMore = () => {
    if (paginationProps.canGetMoreItems && !loading && !selectOnUserHashtags) {
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
      {withTitle && (
        <>
          <H3SemiBold mBottom={'12px'}>{t('hashtags')}</H3SemiBold>

          <MRegular mBottom={'16px'} color={EColors.grey_700}>
            {t('select_hashtag_in_task')}
          </MRegular>
        </>
      )}

      <Input.Hashtag
        value={hashtag}
        inputValue={search}
        onChangeInput={setSearch}
        leftIcon={!hideSearchIcon ? 'Search' : undefined}
        leftIconProps={{ size: 28 }}
        placeholder={selectOnUserHashtags ? '' : t('search')}
        onDelete={onDelete}
        // limit={limit}
        disabled={selectOnUserHashtags}
      />
      {error && <SRegular color={EColors.error}>{error}</SRegular>}

      {!isLimit && (
        <FlexWrapper
          mTop={'16px'}
          wrap={'wrap'}
          justify={'flex-start'}
          align={'flex-start'}>
          {!!currentHashtag.length && (
            <S.ListContainer>
              <FlatList
                nestedScrollEnabled
                data={currentHashtag}
                contentContainerStyle={S.styles.list}
                renderItem={renderHashtag}
                onEndReached={onGetMore}
              />
            </S.ListContainer>
          )}

          {!!loading && renderLoading()}

          {!currentHashtag.length && !!search && (
            <>
              <EmptyHashtag onPress={onAddHashTag} />
            </>
          )}

          {!currentHashtag.length && selectOnUserHashtags && (
            <FlexWrapper>
              <MRegular align={'center'}>{t('empty.profile_hashtag')}</MRegular>
            </FlexWrapper>
          )}
        </FlexWrapper>
      )}
    </>
  )
}
