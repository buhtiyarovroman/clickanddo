import React, { useCallback, useEffect, useState } from 'react'
import { TabComponent } from '../TabComponent'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useGetProjects } from '@/features/Projects/hooks'
import { transformBackendType } from '../../config'
import { FlatList, ListRenderItem } from 'react-native'
import { TProject } from '@/entities/Projects/models'
import { Loader } from '@/shared/ui/loader'
import { FlexWrapper, LRegular } from '@/shared/ui/Styled/Styled'
import { useIsFocused } from '@react-navigation/native'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'
import { ProjectsWidgets } from '@/widgets/Projects'
import { EProjectCardType } from '@/widgets/Projects/ProjectCard/types'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { projectListStyles } from '../../styled'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'

const typeList = [
  EProjectCardType.requisitions,
  EProjectCardType.active,
  EProjectCardType.completed,
]

export const SpecialistList = () => {
  const [activeTab, setActiveTab] = useState<EProjectCardType>(
    EProjectCardType.requisitions,
  )
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const isFocused = useIsFocused()
  const { user } = useTypedSelector(getUserSelector)
  const isCustomer = user?.role === 'customer'

  const responder =
    activeTab === EProjectCardType.requisitions ? user?._id || '' : undefined

  const active = [EProjectCardType.active, EProjectCardType.completed].includes(
    activeTab,
  )
    ? user?._id || ''
    : undefined

  const {
    data: projects,
    canGetMoreItems,
    getMore,
    loadMoreLoading,
    onClear,
    getFirstPage,
  } = useGetProjects({
    specialist: active,
    status: transformBackendType(isCustomer)[activeTab],
    projectResponses: responder,
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
        //check this logic
        type={activeTab}
        mBottom="20px"
        onPress={() => onGoJob(item)}
        onRefresh={() => {
          getFirstPage(true)
        }}
        showStatus
        hideCreatedAt
      />
    ),
    [getFirstPage, onGoJob],
  )

  const onGetMore = () => {
    if (canGetMoreItems) {
      getMore()
    }
  }

  const renderLoader = () => {
    if (loadMoreLoading) {
      return <Loader.Standard />
    }

    return null
  }

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
        key={'FlatListSpecialistProjects'}
        keyExtractor={item => item._id}
        data={projects}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={projectListStyles.list}
        contentContainerStyle={emptyStyles}
        onEndReached={onGetMore}
        ListFooterComponent={renderLoader}
        ListEmptyComponent={renderEmpty}
      />
    </FlexWrapper>
  )
}
