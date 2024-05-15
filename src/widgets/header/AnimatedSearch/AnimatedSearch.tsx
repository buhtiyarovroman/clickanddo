import React, { useState } from 'react'
import { TouchableOpacity, LayoutChangeEvent } from 'react-native'
import { DrawerActions } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { useTypedSelector } from '@/app/store'
import { Header } from '..'

import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'
import { FlexWrapper, Hr } from '@/shared/ui/Styled/Styled'
import { useNavigation } from '@/features/hooks'

import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'
import { THashTag } from '@/entities/User/models'
import {
  getPublicationSelector,
  publicationActions,
} from '@/entities/Publication'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'

import { Animation } from '@/shared/ui/animation'
import { Input as CustomInput } from '@/shared/ui/input'
import { HashtagItem } from '@/shared/ui/HashtagItem'
import { Loader } from '@/shared/ui/loader'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'

import { FilterContainer, Tags } from './styled'
import { TAnimatedSearchProps } from './types'

export const AnimatedSearch = ({ onButtonPress }: TAnimatedSearchProps) => {
  const { t } = useTranslation()
  const [dataHeight, setDataHeight] = useState<number>(0)
  const dispatch = useDispatch()
  const { listFilters } = useTypedSelector(getPublicationSelector)
  const [resultHeight, setResultHeight] = useState<number>(0)
  const { filterHashtag } = useTypedSelector(getProjectsSelector)
  const { dispatch: navDispatch } = useNavigation()
  const {
    search,
    setSearch,
    foundHashTags,
    onAddHashTag,
    loading: foundHashTagsLoading,
  } = useFindHashtags()

  const renderChildrenInput = () => {
    return (
      <FlexWrapper justify={'space-between'}>
        <TouchableOpacity
          onPress={() => navDispatch(DrawerActions.openDrawer())}>
          <Icon name={'DrawerBurger'} size={20} />
        </TouchableOpacity>
        <CustomInput.Search
          height="50px"
          value={search}
          onChange={setSearch}
          width={'70%'}
          label={t('tag_search')}
          placeholder={t('search_by_category')}
        />

        <FilterContainer onPress={onButtonPress}>
          <Icon name={'Filter'} fill={EColors.white} />
        </FilterContainer>
      </FlexWrapper>
    )
  }
  const handleDataHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setDataHeight(height + 8)
  }

  const onSelectedSearchItemPress = (item: THashTag) => {
    dispatch(
      projectsActions.setFilterHashtag(
        filterHashtag.filter(el => el._id !== item._id),
      ),
    )

    dispatch(
      publicationActions.setState({
        listFilters: {
          ...listFilters,
          hashtag: listFilters.hashtag.filter(el => el !== item._id),
        },
      }),
    )
  }

  const handleResultHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setResultHeight(height + 8)
  }

  const onSearchItemPress = (item: THashTag) => {
    if (filterHashtag.find(el => el._id === item._id)) {
      dispatch(
        projectsActions.setFilterHashtag(
          filterHashtag.filter(el => el._id !== item._id),
        ),
      )
    } else {
      dispatch(projectsActions.setFilterHashtag([...filterHashtag, item]))
    }
    dispatch(
      publicationActions.setState({
        listFilters: {
          ...listFilters,
          hashtag: [...listFilters.hashtag, item._id],
        },
      }),
    )
  }
  const ids = filterHashtag.map(item => item._id)
  return (
    <Header.Container>
      <Animation.Container
        hasInstTop
        dataHeight={dataHeight}
        resultHeight={resultHeight}
        dataLength={filterHashtag.length}
        searchLength={search.length + 1}
        resultLength={foundHashTags.length}
        inputChildren={renderChildrenInput}>
        {/* Store hashtag */}
        <Tags onLayout={handleDataHeight}>
          {filterHashtag.map(item => (
            <HashtagItem
              isActive
              key={item._id}
              {...item}
              onPress={onSelectedSearchItemPress}
            />
          ))}

          {filterHashtag.length !== 0 && (
            <Hr color={EColors.grey_300} mTop="5px" mBottom="5px" />
          )}
        </Tags>

        {foundHashTagsLoading && <Loader.Standard size={30} />}
        <Tags onLayout={handleResultHeight}>
          {/* Searchable hashtag */}
          {filterHashtag.length < 3 && foundHashTags.length !== 0 && (
            <>
              {foundHashTags
                .filter(el => !ids.includes(el._id))
                .map(item => (
                  <HashtagItem
                    key={item._id}
                    {...item}
                    onPress={onSearchItemPress}
                  />
                ))}
            </>
          )}

          {filterHashtag.length < 3 &&
            foundHashTags.length === 0 &&
            !foundHashTagsLoading && (
              <>
                <EmptyHashtag onPress={onAddHashTag} />
              </>
            )}
        </Tags>
      </Animation.Container>
    </Header.Container>
  )
}

export default AnimatedSearch
