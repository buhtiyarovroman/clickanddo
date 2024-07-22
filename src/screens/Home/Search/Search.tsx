import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, LayoutChangeEvent, ListRenderItem, View } from 'react-native'
import { t } from 'i18next'
import { useDispatch } from 'react-redux'

import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'

import { Header } from '@/widgets/header'
import { ProjectCard } from '@/widgets/Projects/ProjectCard'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { FilterContainer } from '@/widgets/Category/List/ui/HomeHead/styled'

import { useNavigation } from '@/features/hooks'
import { useGetProjects } from '@/features/Projects/hooks'
import { useGetSpecialists } from '@/features/specialists'
import { useFindHashtags } from '@/features/Projects/hooks/useFindHashtags'

import { getUserSelector } from '@/entities/User'
import { THashTag, TUser } from '@/entities/User/models'
import { SpecialistCard } from '@/entities/Specialist/SpecialistCard'
import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'

import { Icon } from '@/shared/ui/Icon'
import { Loader } from '@/shared/ui/loader'
import { EColors } from '@/shared/ui/Styled'
import { Animation } from '@/shared/ui/animation'
import { Background } from '@/shared/ui/background'
import { Input as CustomInput } from '@/shared/ui/input'
import { FlexWrapper, Hr } from '@/shared/ui/Styled/Styled'

import * as S from './styles'
import { styles, ListContainer } from './styles'
import { TProject } from '@/entities/Projects/models'
import { HashtagItem } from '@/shared/ui/HashtagItem'
import { EmptyHashtag } from '@/entities/User/EmptyHashtag'
import { useIsFocused } from '@react-navigation/native'
import { useSharedValue, withTiming } from 'react-native-reanimated'

const nicknameReg = /^@.*/

export const Search = () => {
  const isFocused = useIsFocused()
  const { user } = useTypedSelector(getUserSelector)
  const { filterHashtag } = useTypedSelector(getProjectsSelector)

  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const [dataHeight, setDataHeight] = useState<number>(0)
  const [resultHeight, setResultHeight] = useState<number>(0)

  const isCustomer = user?.role === 'customer'

  const [searchInput, setSearchInput] = useState('')

  const [modalOpen, setModalOpen] = useState(false)

  const padding = useSharedValue(0)

  useEffect(() => {
    if (modalOpen) {
      padding.value = withTiming(
        dataHeight + (filterHashtag.length === 3 ? 0 : resultHeight),
      )
      return
    }

    padding.value = withTiming(0)
  }, [modalOpen, filterHashtag.length])

  const {
    data: projects,
    getFirstPage: getProjectsFP,
    setData: setProjects,
    loadMoreLoading: projectsLoadMoreLoading,
    canGetMoreItems: canGetMoreProjects,
    getMore: getMoreProjects,
  } = useGetProjects({
    limit: 15,
    hashtag: filterHashtag.map(item => item._id),
    status: [EProjectTypes.searching],
  })

  const {
    data: specialists,
    getFirstPage: getSpecialistsFP,
    loadMoreLoading: specialistsLoadMoreLoading,
    getMore: getMoreSpecialists,
    canGetMoreItems: canGetMoreSpecialists,
    setData: setSpecialists,
  } = useGetSpecialists({
    limit: 15,
    hashtag: filterHashtag.map(item => item._id),
    login: nicknameReg.test(searchInput)
      ? searchInput.replace('@', '')
      : undefined,
  })

  const CurrentData = isCustomer ? specialists : projects

  const {
    search,
    setSearch,
    foundHashTags,
    onAddHashTag,
    fetchHashtags,
    loading: foundHashTagsLoading,
    ...paginationProps
  } = useFindHashtags()

  useEffect(() => {
    if (nicknameReg.test(searchInput)) {
      getSpecialistsFP()
    }
    if (!nicknameReg.test(searchInput)) {
      setSearch(searchInput)
    }
  }, [searchInput])

  useEffect(() => {
    isFocused && fetchHashtags(0)
  }, [isFocused])

  useEffect(() => {
    const fetchData = isCustomer ? getSpecialistsFP : getProjectsFP
    const resetData = () => (isCustomer ? setSpecialists([]) : setProjects([]))

    if (filterHashtag.length !== 0) {
      fetchData()
    } else {
      resetData()
    }
  }, [filterHashtag.length])

  const onGoProject = (project: TProject) => {
    navigate(EScreens.HomeJobStackScreen, {
      screen: EScreens.JobMain,
      params: {
        project,
      },
    })
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
  }

  const onSelectedSearchItemPress = (item: THashTag) => {
    dispatch(
      projectsActions.setFilterHashtag(
        filterHashtag.filter(el => el._id !== item._id),
      ),
    )
  }

  const onProjectsEndReached = () => {
    if (isCustomer) {
      if (canGetMoreProjects) {
        getMoreProjects()
      } else {
        if (canGetMoreSpecialists) {
          getMoreSpecialists()
        }
      }
    }
  }

  const onGoMap = () => navigate(EScreens.HomeMap)

  const onGoSpecialistProfile = (id: string) => {
    navigate(EScreens.HomeJobStackScreen, {
      screen: EScreens.JobProfile,
      params: { id },
    })
  }

  const handleDataHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setDataHeight(height + 8)
  }

  const handleResultHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setResultHeight(height + 8)
  }

  const renderLoader = useCallback(() => {
    if (projectsLoadMoreLoading || specialistsLoadMoreLoading) {
      return <Loader.Standard size={30} />
    }

    return <View style={{ height: TAB_HEIGHT + 20 }} />
  }, [projectsLoadMoreLoading, specialistsLoadMoreLoading])

  const renderSeparator = () => <View style={styles.separator} />

  const renderChildrenInput = () => (
    <FlexWrapper justify={'space-between'}>
      <CustomInput.Search
        value={searchInput}
        onChange={setSearchInput}
        width={'80%'}
        label={
          searchInput.includes('@') ? t('nickname_search') : t('tag_search')
        }
        placeholder={t('search_by_category')}
      />

      <FilterContainer onPress={onGoMap}>
        <Icon name={'RoadMap'} fill={EColors.white} />
      </FilterContainer>
    </FlexWrapper>
  )

  const renderItem: ListRenderItem<TUser | TProject> = ({ item }) => {
    if ('dateOfBirth' in item) {
      let userItem: TUser = item

      return (
        <SpecialistCard
          onPress={() => onGoSpecialistProfile(userItem._id)}
          item={userItem}
        />
      )
    } else if ('relevantUntil' in item) {
      let project: TProject = item

      return (
        <ProjectCard
          project={project}
          setProjects={setProjects}
          onPress={() => onGoProject(project)}
          showDates
        />
      )
    }

    return <></>
  }

  const renderHashTags: ListRenderItem<THashTag> = ({ item }) => (
    <HashtagItem key={item._id} {...item} onPress={onSearchItemPress} />
  )

  const onGetMore = () => {
    if (paginationProps.canGetMoreItems && !foundHashTagsLoading) {
      paginationProps.getMore()
    }
  }

  const renderLoading = () => {
    if (foundHashTagsLoading) {
      return <Loader.Standard />
    }
    return <></>
  }

  return (
    <Background.SafeArea edges={['bottom']}>
      <Header.Standard goBack title={t('tag_search')} />

      <Background.Standard style={styles.main}>
        <Animation.Container
          dataHeight={dataHeight}
          resultHeight={resultHeight}
          dataLength={filterHashtag.length}
          searchLength={search.length + 1}
          resultLength={foundHashTags.length}
          onChangeOpen={setModalOpen}
          inputChildren={renderChildrenInput}>
          {/* Store hashtag */}
          <S.Tags onLayout={handleDataHeight}>
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
          </S.Tags>

          {foundHashTagsLoading && <Loader.Standard size={30} />}
          <S.FoundedTags onLayout={handleResultHeight}>
            {/* Searchable hashtag */}
            {filterHashtag.length < 3 && foundHashTags.length !== 0 && (
              <>
                <FlatList
                  nestedScrollEnabled
                  data={foundHashTags}
                  contentContainerStyle={S.styles.list}
                  renderItem={renderHashTags}
                  onEndReached={onGetMore}
                />
                {foundHashTagsLoading && renderLoading()}
              </>
            )}

            {filterHashtag.length < 3 &&
              foundHashTags.length === 0 &&
              !foundHashTagsLoading && (
                <>
                  <EmptyHashtag onPress={onAddHashTag} />
                </>
              )}
          </S.FoundedTags>
        </Animation.Container>

        {/* TODO - REFACTOR */}
        <ListContainer style={{ paddingTop: padding }}>
          <FlatList
            style={styles.projectsList}
            data={CurrentData}
            onEndReached={onProjectsEndReached}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderLoader}
            ItemSeparatorComponent={renderSeparator}
            renderItem={renderItem}
          />
        </ListContainer>
      </Background.Standard>
    </Background.SafeArea>
  )
}
