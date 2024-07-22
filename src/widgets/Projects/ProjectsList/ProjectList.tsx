import React, { useEffect, useState } from 'react'
import { FlatList, ListRenderItem, RefreshControl } from 'react-native'
import { t } from 'i18next'

import { EScreens } from '@/app/navigation'
import { useGetProjects } from '@/features/Projects/hooks'
import { useNavigation } from '@/features/hooks'
import { TProject } from '@/entities/Projects/models/common'
import { ProjectsWidgets } from '..'
import { EProjectCardType, EProjectTypes } from '../ProjectCard/types'
import { Loader } from '@/shared/ui/loader'
import { FlexWrapper, H3SemiBold, LRegular } from '@/shared/ui/Styled/Styled'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useIsFocused } from '@react-navigation/native'
import { EColors } from '@/shared/ui/Styled'
import { SpecialistHead } from './ui'
import { THashTag } from '@/entities/User/models'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'
import { getUserSelector } from '@/entities/User'
import { Button } from '@/shared/ui/button'
import { EDrawerStackScreens } from '@/app/navigation/drawer/types'
import { useDispatch } from 'react-redux'

export const ProjectList = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const { filterHome } = useTypedSelector(getProjectsSelector)
  const { user } = useTypedSelector(getUserSelector)
  const [selectedHashtag, setSelectedHashtag] = useState<THashTag[]>([])

  const {
    getFirstPage,
    data,
    getMore,
    canGetMoreItems,
    loadMoreLoading,
    refreshLoading,
    filterData,
  } = useGetProjects({
    status: [EProjectTypes.searching],
    limit: 10,
    hashtag: [
      ...selectedHashtag.map(item => item._id),
      ...(user?.hashtag || []).map(item => item._id),
    ],
    relevantUntilLb: filterHome.relevantUntilLb || new Date().toISOString(),
    relevantUntilHb: filterHome.relevantUntilHb,
    maxDistance: filterHome.location?.radius,
    location:
      filterHome.location?.longitude && filterHome.location?.latitude
        ? [filterHome.location?.longitude, filterHome.location?.latitude]
        : [],
    priceTo: filterHome.max,
    priceFrom: filterHome.min,
    createdHb: filterHome.createdHb,
    createdLb: filterHome.createdLb,
  })

  const [showList, setShowList] = useState(true)
  const [needList, setNeedList] = useState(false)

  useEffect(() => {
    if (
      !!selectedHashtag.length ||
      Object.keys(filterHome).length !== 0 ||
      needList
    ) {
      setShowList(true)
      return
    }

    if (!user?.hashtag?.length) {
      setNeedList(false)
      setShowList(false)

      return
    }

    if (!!user?.hashtag?.length && !data.length) {
      setNeedList(false)
      setShowList(false)

      return
    }
    setShowList(true)
  }, [user?.hashtag?.length, data.length, selectedHashtag.length, filterData])

  const onGoProject = (project: TProject) => {
    navigate(EScreens.HomeJobStackScreen, {
      screen: EScreens.JobMain,
      params: { project },
    })
  }

  const renderItem: ListRenderItem<TProject> = ({ item }) => (
    <ProjectsWidgets.ProjectCard
      project={item}
      type={EProjectCardType.active}
      mBottom={'20px'}
      onPress={() => onGoProject(item)}
      showDates
    />
  )

  const onGetMore = () => {
    if (!canGetMoreItems) return
    getMore()
  }

  const renderLoader = () => {
    if (loadMoreLoading && !!data.length) {
      return <Loader.Standard />
    }

    return null
  }

  const onRefresh = () => {
    getFirstPage()
  }

  useEffect(() => {
    isFocused && onRefresh()
  }, [selectedHashtag, isFocused, filterHome])

  const onShow = () => {
    setNeedList(true)
    setSelectedHashtag([])
    dispatch(projectsActions.setState({ filterHome: {} }))
    setShowList(true)
  }

  const onGoProfile = () => {
    navigate(EDrawerStackScreens.ProfileStack)
  }

  return (
    <>
      <FlexWrapper
        flexDirection={'column'}
        align={'flex-start'}
        mBottom={'32px'}>
        <SpecialistHead
          {...{ selectedHashtag, setSelectedHashtag, filterData }}
        />
        <H3SemiBold mTop={'30px'}>{t('select_project')}</H3SemiBold>
      </FlexWrapper>
      {!!showList && (
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshLoading}
              onRefresh={onRefresh}
              tintColor={EColors.primary}
            />
          }
          onEndReached={onGetMore}
          contentContainerStyle={{ paddingBottom: TAB_HEIGHT + 16 }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderLoader}
          renderItem={renderItem}
        />
      )}

      {!showList && (
        <FlexWrapper flexDirection={'column'}>
          <LRegular align={'center'}>{t('home_empty_hashtags')}</LRegular>

          <FlexWrapper justify={'space-around'} mTop={'16px'}>
            <Button.Standard
              width={'40%'}
              text={t('add_skills')}
              onPress={onGoProfile}
            />

            <Button.Standard
              width={'40%'}
              text={t('show_all_request')}
              onPress={onShow}
            />
          </FlexWrapper>
        </FlexWrapper>
      )}
    </>
  )
}
