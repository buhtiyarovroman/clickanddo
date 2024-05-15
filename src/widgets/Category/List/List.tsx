import { FlexWrapper, H3SemiBold } from '@/shared/ui/Styled/Styled'
import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList, ListRenderItem } from 'react-native'
import { HomeHead } from './ui/HomeHead'
import { CategoryCard } from '@/entities/Category/CategoryCard'
import { styles } from './styled'
import { useGetCategories } from '@/features/Categories'
import { TCategory } from '@/entities/Category/models'
import { useIsFocused } from '@react-navigation/native'
import { Loader } from '@/shared/ui/loader'
import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'

export const List = () => {
  const isFocused = useIsFocused()
  const {
    categories,
    getFirstPage,
    getMore,
    canGetMoreItems,
    loadMoreLoading,
  } = useGetCategories()
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const onCategoryItemPress = (item: TCategory) => {
    navigate(EScreens.HomeSpecialists, {
      title: item.title,
      category: item._id,
    })
  }

  const renderItem: ListRenderItem<TCategory> = ({ item }) => (
    <CategoryCard
      onPress={() => onCategoryItemPress(item)}
      mBottom={'15px'}
      width={'48%'}
      {...item}
    />
  )

  const renderLoader = useCallback(
    () => <>{loadMoreLoading && <Loader.Standard />}</>,
    [loadMoreLoading],
  )

  const renderHeader = () => (
    <FlexWrapper flexDirection={'column'} align={'flex-start'} mBottom={'32px'}>
      <HomeHead />

      <H3SemiBold mTop={'20px'}>{t('select_category')}</H3SemiBold>
    </FlexWrapper>
  )

  const onGetMore = () => {
    if (!canGetMoreItems) return
    getMore()
  }

  useEffect(() => {
    getFirstPage()
  }, [isFocused])

  return (
    <>
      <FlatList
        keyExtractor={item => item._id}
        data={categories}
        key={2}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderLoader}
        onEndReached={onGetMore}
        onEndReachedThreshold={100}
      />
    </>
  )
}
