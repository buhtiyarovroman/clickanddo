import React from 'react'
import { View, FlatList, ListRenderItem } from 'react-native'

import { styles } from './styles'
import { TFiltersProps } from './types'
import { FilterItem } from './ui'
import { EFavoritesFilters } from './ui/FilterItem/types'

export const Filters = ({
  filters = [],
  selectedFilter = EFavoritesFilters.All,
  setSelectedFilter = () => {},
}: TFiltersProps) => {
  const renderHeader = () => {
    const isActive = selectedFilter === EFavoritesFilters.All
    return (
      <FilterItem
        isFirst
        onPress={() => setSelectedFilter(EFavoritesFilters.All)}
        filter={EFavoritesFilters.All}
        isActive={isActive}
      />
    )
  }

  const renderItem: ListRenderItem<EFavoritesFilters> = ({ item }) => {
    const isActive = selectedFilter === item

    return (
      <FilterItem
        onPress={() => setSelectedFilter(item)}
        filter={item}
        isActive={isActive}
      />
    )
  }

  const renderSeparator = () => <View style={styles.separator} />

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={filters}
      ListHeaderComponent={renderHeader}
      renderItem={renderItem}
      ItemSeparatorComponent={renderSeparator}
      style={styles.list}
    />
  )
}
