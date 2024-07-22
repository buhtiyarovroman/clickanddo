import React, { useCallback, useEffect, useState } from 'react'
import { TabComponent } from '../TabComponent'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useGetProjects } from '@/features/Projects/hooks/useGetProjects'
import { FlexWrapper, LRegular } from '@/shared/ui/Styled/Styled'
import { FlatList, ListRenderItem } from 'react-native'
import { TProject } from '@/entities/Projects/models'
import { Loader } from '@/shared/ui/loader'
import { transformBackendType } from '../../config'
import { useIsFocused } from '@react-navigation/native'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { ProjectsWidgets } from '@/widgets/Projects'
import { EProjectCardType } from '@/widgets/Projects/ProjectCard/types'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { projectListStyles } from '../../styled'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'

const typeList = [
  EProjectCardType.active,
  EProjectCardType.graft,
  EProjectCardType.completed,
]

export const CustomerList = () => {
  const [activeTab, setActiveTab] = useState<EProjectCardType>(
    EProjectCardType.active,
  )
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const { user } = useTypedSelector(getUserSelector)
  const { navigate } = useNavigation()
  const isCustomer = user?.role === 'customer'

  const {
    data: projects,
    canGetMoreItems,
    getMore,
    loadMoreLoading,
    onClear,
    getFirstPage,
    setData: setProjects,
  } = useGetProjects({
    owner: user?._id || '',
    status: transformBackendType(isCustomer)[activeTab],
  })

  const isEmpty = projects.length === 0

  useEffect(() => {
    isFocused && getFirstPage()
  }, [isFocused, activeTab])

  const onGoJob = useCallback(
    (project: TProject) => {
      navigate(EScreens.ProjectJobStack, {
        screen: EScreens.JobMain,
        params: { project },
      })
    },
    [navigate],
  )

  const renderItem: ListRenderItem<TProject> = useCallback(
    ({ item }) => (
      <ProjectsWidgets.ProjectCard
        project={item}
        setProjects={setProjects}
        type={activeTab}
        mBottom={'20px'}
        onPress={() => onGoJob(item)}
        onRefresh={() => getFirstPage(true)}
        showStatus
        hideCreatedAt
        needChatDetect
      />
    ),
    [getFirstPage, onGoJob, activeTab, setProjects],
  )

  const onGetMore = () => {
    if (canGetMoreItems) {
      getMore()
    }
  }

  const renderLoader = useCallback(() => {
    if (loadMoreLoading) {
      return <Loader.Standard />
    }

    return null
  }, [loadMoreLoading])

  const renderEmpty = () => {
    if (loadMoreLoading) {
      return <></>
    }

    return (
      <FlexWrapper height={'100%'}>
        <LRegular color={EColors.grey_600}>
          {t(`empty.projects.${activeTab}`)}
        </LRegular>
      </FlexWrapper>
    )
  }

  const emptyStyles = isEmpty
    ? projectListStyles.empty
    : { paddingBottom: TAB_HEIGHT + 16 }

  const onChangeActiveTab = (value: EProjectCardType) => {
    setActiveTab(value)
    onClear()
  }

  return (
    <FlexWrapper flexDirection={'column'}>
      <TabComponent
        list={typeList}
        activeType={activeTab}
        setType={onChangeActiveTab}
        mBottom={'20px'}
      />

      <FlatList
        key={'FlatListCustomerProjects'}
        keyExtractor={item => item._id}
        data={projects}
        renderItem={renderItem}
        style={projectListStyles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={emptyStyles}
        onEndReached={onGetMore}
        ListFooterComponent={renderLoader}
        ListEmptyComponent={renderEmpty}
      />
    </FlexWrapper>
  )
}
