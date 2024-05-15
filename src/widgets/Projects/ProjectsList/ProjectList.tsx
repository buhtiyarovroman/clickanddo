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
import { FlexWrapper, H3SemiBold } from '@/shared/ui/Styled/Styled'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useIsFocused } from '@react-navigation/native'
import { EColors } from '@/shared/ui/Styled'
import { SpecialistHead } from './ui'
import { THashTag } from '@/entities/User/models'
import { useTypedSelector } from '@/app/store'
import { getProjectsSelector } from '@/entities/Projects/store'

export const ProjectList = () => {
  const { navigate } = useNavigation()
  const isFocused = useIsFocused()
  const { filterHome } = useTypedSelector(getProjectsSelector)
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
    hashtag: selectedHashtag.map(item => item._id),
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
    </>
  )
}
