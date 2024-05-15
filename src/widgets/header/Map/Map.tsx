import React, { useEffect, useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'
import { useNavigation } from '@/features/hooks'
import { THashTag } from '@/entities/User/models'
import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'

import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/input'
import { Loader } from '@/shared/ui/loader'
import { EColors } from '@/shared/ui/Styled'
import { Animation } from '@/shared/ui/animation'
import { HashtagItem } from '@/shared/ui/HashtagItem'
import { FlexWrapper, Hr } from '@/shared/ui/Styled/Styled'

import { TMapHeaderProps } from './types'
import { Tags, FilterContainer, SearchingHashtagScroll } from './styled'
import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'
import { useIsFocused } from '@react-navigation/native'

export const Map = ({}: TMapHeaderProps) => {
  const { foundHashTags, search, setSearch, onAddHashTag, fetchHashtags } =
    useFindHashtags()

  const isFocused = useIsFocused()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const currentSearchIcon = search.length ? 'CloseBackground' : undefined

  const [dataHeight, setDataHeight] = useState<number>(0)
  const [resultHeight, setResultHeight] = useState<number>(0)

  const { filterHashtag, loading } = useTypedSelector(getProjectsSelector)

  const ids = filterHashtag.map(item => item._id)

  const currentSearchableHashtag = foundHashTags.filter(
    el => !ids.includes(el._id),
  )

  useEffect(() => {
    isFocused && fetchHashtags()
  }, [isFocused])

  const _onGoBack = () => {
    navigation.goBack()
  }

  const onClearInput = () => {
    setSearch('')
  }

  const onPressHashtag = (searchHashtag: THashTag) => {
    dispatch(
      projectsActions.setFilterHashtag([...filterHashtag, searchHashtag]),
    )
  }

  const onPressSelectedHashtag = (selectedHashtag: THashTag) => {
    dispatch(
      projectsActions.setFilterHashtag(
        filterHashtag.filter(el => el._id !== selectedHashtag._id),
      ),
    )
  }

  const handleDataHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    // console.log('handleDataHeight', height)
    setDataHeight(height + 8)
  }

  const handleResultHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    // console.log('handleResultHeight', height)
    setResultHeight(height + 8)
  }

  const renderCurrentHashtag = (item: THashTag) => {
    return <HashtagItem isActive {...item} onPress={onPressSelectedHashtag} />
  }

  const renderSearchHashtag = (item: THashTag) => {
    return <HashtagItem {...item} onPress={onPressHashtag} />
  }

  const renderInputChildren = () => {
    return (
      <FlexWrapper justify={'space-between'} mBottom={'10px'}>
        <Input.Search
          width={'80%'}
          height={'56px'}
          value={search}
          onChange={setSearch}
          label={t('tag_search')}
          rightIcon={currentSearchIcon}
          onPressRightIcon={onClearInput}
          rightIconProps={{
            size: 20,
          }}
        />

        <FilterContainer onPress={_onGoBack}>
          <Icon name={'ListCheck'} fill={EColors.white} />
        </FilterContainer>
      </FlexWrapper>
    )
  }

  return (
    <>
      <Animation.Container
        hasInstTop={true}
        dataHeight={dataHeight}
        resultHeight={resultHeight}
        dataLength={filterHashtag.length}
        searchLength={search.length + 1}
        resultLength={currentSearchableHashtag.length}
        inputChildren={renderInputChildren}>
        <Tags onLayout={handleDataHeight}>
          {filterHashtag.map(renderCurrentHashtag)}

          {filterHashtag.length !== 0 && (
            <>
              <Hr color={EColors.grey_300} mTop="5px" mBottom="5px" />
            </>
          )}
        </Tags>

        {loading && <Loader.Standard size={30} />}

        {/* Searchable hashtag */}
        <SearchingHashtagScroll onLayout={handleResultHeight}>
          {filterHashtag.length < 3 &&
            !!currentSearchableHashtag.length &&
            currentSearchableHashtag.map(renderSearchHashtag)}
          {filterHashtag.length < 3 && !currentSearchableHashtag.length && (
            <>
              <EmptyHashtag onPress={onAddHashTag} />
            </>
          )}
        </SearchingHashtagScroll>
      </Animation.Container>
    </>
  )
}
