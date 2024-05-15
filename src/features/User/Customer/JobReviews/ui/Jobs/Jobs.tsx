import React, { useCallback, useEffect, useState } from 'react'
import { ListRenderItem, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { useGetProjects } from '@/features/Projects/hooks/useGetProjects'
import { Publication } from '@/entities/Publication/Publication'
import { Loader } from '@/shared/ui/loader'
import { Header } from './ui/Header'
import { useIsFocused } from '@react-navigation/native'
import { TProject } from '@/entities/Projects/models/common'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import {
  EUserProjectsSortType,
  TSortProps,
  TUserCustomerJobProps,
} from './types'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

export const Jobs = ({ _id, isEdit = false }: TUserCustomerJobProps) => {
  const isFocused = useIsFocused()
  const { navigate } = useNavigation()
  const [sort, setSort] = useState<TSortProps>({
    sortBy: 'createdAt',
    order: -1,
    type: EUserProjectsSortType.new_to_old,
  })

  const {
    data: projects,
    getFirstPage,
    getMore,
    loadMoreLoading,
    canGetMoreItems,
    localLoading,
  } = useGetProjects({
    limit: 15,
    owner: _id as string,
    order: sort.order,
    sortBy: sort.sortBy,
  })

  useEffect(() => {
    getFirstPage()
  }, [sort])

  const onGetMore = () => {
    if (!canGetMoreItems) return
    getMore()
  }

  const renderLoader = useCallback(() => {
    if (canGetMoreItems && loadMoreLoading) {
      return <Loader.Standard />
    }

    return null
  }, [canGetMoreItems, loadMoreLoading])

  const onGoProject = (project: TProject) => {
    if (isEdit) {
      navigate(EScreens.JobStack, {
        screen: EScreens.JobMain,
        params: { project },
      })
      return
    }

    navigate(EScreens.JobMain, { project })
  }

  const renderItem: ListRenderItem<TProject> = ({ item }) => (
    <Publication
      images={item.images}
      heading={item.name}
      width="48%"
      mBottom={'16px'}
      imageType={'project'}
      onPress={() => onGoProject(item)}
    />
  )

  useEffect(() => {
    getFirstPage()
  }, [isFocused])

  return (
    <View style={styles.main}>
      <Header onChangeSort={setSort} sortType={sort.type} />
      {localLoading && <Loader.Standard />}
      <FlatList
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        onEndReached={onGetMore}
        onEndReachedThreshold={1}
        key={2}
        numColumns={2}
        columnWrapperStyle={styles.flatListColumnWrapper}
        data={projects}
        ListFooterComponent={renderLoader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: TAB_HEIGHT * 4 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  flatListColumnWrapper: {
    justifyContent: 'space-between',
  },
  footer: {
    marginBottom: 170,
  },

  main: { paddingHorizontal: 20 },
})
