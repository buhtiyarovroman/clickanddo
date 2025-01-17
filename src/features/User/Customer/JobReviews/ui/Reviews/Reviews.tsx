import React, { useCallback, useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { ReviewCard } from '@/entities/User/ReviewCard'
import { ListRenderItem, StyleSheet } from 'react-native'
import { useGetUserReviews } from '@/features/User/hooks'
import { TReview } from '@/entities/User/models'
import { Loader } from '@/shared/ui/loader'
import { TProfileReview } from './types'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'

export const Reviews = ({ _id = '' }: TProfileReview) => {
  const { bottom } = useSafeAreaInsets()
  const { reviews, getFirstPage, canGetMoreItems, getMore, loadMoreLoading } =
    useGetUserReviews({ id: _id })

  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getFirstPage()
    }
  }, [isFocused])

  const renderItem: ListRenderItem<TReview> = ({ item }) => (
    <ReviewCard mBottom={'16px'} {...item} />
  )

  const onGetMore = () => {
    if (!canGetMoreItems) return
    getMore()
  }

  const renderLoader = useCallback(
    () => <>{loadMoreLoading && <Loader.Standard />}</>,
    [loadMoreLoading],
  )

  return (
    <FlatList
      keyExtractor={item => item._id}
      data={reviews}
      renderItem={renderItem}
      onEndReached={onGetMore}
      ListFooterComponent={renderLoader}
      contentContainerStyle={[
        {
          paddingBottom: TAB_HEIGHT + bottom + 32,
        },
        styles.flatList,
      ]}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})
