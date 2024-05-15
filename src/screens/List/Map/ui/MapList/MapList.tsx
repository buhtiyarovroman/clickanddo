import { Loader } from '@/shared/ui/loader'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { ListTile } from '@/widgets/List/ui'
import React from 'react'
import { FlatList } from 'react-native'
import { TListMapListProps } from './types'

export const MapList = ({
  getMore = () => {},
  publication = [],
  loadMoreLoading = false,
  currentPublication = '',
}: TListMapListProps) => {
  const currentList = !!currentPublication
    ? publication.filter(item => item._id === currentPublication)
    : publication
  const renderFooter = () => {
    if (!loadMoreLoading) return null

    if (currentPublication) return null

    return <Loader.Standard mBottom="20px" mTop={'20px'} />
  }
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      onEndReached={() => getMore()}
      data={[1]}
      contentContainerStyle={{ paddingBottom: TAB_HEIGHT * 2 }}
      renderItem={() => <ListTile publications={currentList} />}
      ListFooterComponent={renderFooter}
    />
  )
}
