import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, ListRenderItem, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { useGetFavorites } from '@/features/Favorites'
import { FavoritesEntities } from '@/entities/Favorites'
import { FlexWrapper, H3SemiBold } from '@/shared/ui/Styled/Styled'
import { Loader } from '@/shared/ui/loader'
import { Filters } from './ui'
import { styles } from './styles'
import { useIsFocused } from '@react-navigation/native'
import { FavoritesService } from '@/entities/Favorites/services'
import { TFavorite } from '@/entities/Favorites/models'
import { getTranslate } from '@/shared/utils'
import { TPublication } from '@/entities/Publication/models'
import { TUser } from '@/entities/User/models'
import { EFavoritesFilters } from './ui/Filters/ui/FilterItem/types'

const filters = [
  EFavoritesFilters.Specialists,
  EFavoritesFilters.Publications,
  // EFavoritesFilters.SpecialOffers,
  // EFavoritesFilters.SkillBoxes,
]

export const List = () => {
  const { t } = useTranslation()
  const isFocused = useIsFocused()

  const [selectedFilter, setSelectedFilter] = useState<EFavoritesFilters>(
    EFavoritesFilters.All,
  )

  const {
    favorites,
    getFirstPage,
    loading,
    canGetMoreItems,
    getMore,
    setFavorites,
  } = useGetFavorites({ limit: 10 })

  const handleDelete = async (id: string) => {
    try {
      await FavoritesService.deleteFromFavorites(id)
      setFavorites(prev => prev.filter(item => item._id !== id))
    } catch (e) {
      console.log(e)
    }
  }
  const handleMessage = () => {}

  const handleEndReached = () => {
    if (!canGetMoreItems || loading) return
    getMore()
  }

  const renderItem: ListRenderItem<TFavorite> = ({ item }) => {
    const isSpecialist = item.type === 'specialist'
    return (
      <FavoritesEntities.Card
        type={item.type}
        favorite={item.favorite}
        name={item.name}
        hashtag={getTranslate(item.hashtag?.title || [])}
        image={
          !isSpecialist
            ? (item.favorite as TPublication).images[0]
            : (item.favorite as TUser)?.photo || ''
        }
        onMessagePress={handleMessage}
        onDeletePress={() => handleDelete(item._id)}
      />
    )
  }

  const renderSeparator = () => <View style={styles.separator} />

  const renderFooter = useCallback(
    () => (loading ? <Loader.Standard mTop="15px" size={20} /> : <></>),
    [loading],
  )

  useEffect(() => {
    getFirstPage()
  }, [isFocused])

  const filterByType = (data: any[], type: string) =>
    data.filter(item => (item as TPublication)?.type === type)

  const getFilteredData = () => {
    switch (selectedFilter) {
      case EFavoritesFilters.All:
        return favorites
      case EFavoritesFilters.Specialists:
        return filterByType(favorites, 'specialist')
      case EFavoritesFilters.Publications:
        return filterByType(favorites, 'publication')
      case EFavoritesFilters.SpecialOffers:
        return filterByType(favorites, 'special-offer')
      case EFavoritesFilters.SkillBoxes:
        return filterByType(favorites, 'skillbox')
      default:
        return []
    }
  }

  return (
    <FlexWrapper width="100%" flexDirection="column" justify="flex-start">
      <FlexWrapper mTop="5px" justify="space-between">
        <H3SemiBold>
          {t('favorites.total', { value: favorites.length })}
        </H3SemiBold>
        {/* <LayoutSwitch isGridLayout={isGridLayout} setValue={setIsGridLayout} /> */}
      </FlexWrapper>

      <Filters
        filters={filters}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <FlatList
        onEndReached={handleEndReached}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={getFilteredData()}
        contentContainerStyle={styles.list_content}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        columnWrapperStyle={styles.list_column}
        renderItem={renderItem}
      />
    </FlexWrapper>
  )
}
