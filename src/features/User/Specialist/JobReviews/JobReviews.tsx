import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { TSpecialistUserJobReviewsProps } from './types'
import { ListRenderItem, View, FlatList, ViewToken } from 'react-native'
import { styles } from './styled'
import { FlexWrapper, H3SemiBold } from '@/shared/ui/Styled/Styled'
import { TReview } from '@/entities/User/models'
import { useGetUserReviews } from '../../hooks'
import { UserEntities } from '@/entities/User'
import { EColors } from '@/shared/ui/Styled'
import { useIsFocused } from '@react-navigation/native'
import { PaginationController } from '@/shared/ui/PaginationController'
import { wp } from '@/shared/ui/utils'
import { Loader } from '@/shared/ui/loader'

export const JobReviews = ({ _id = '' }: TSpecialistUserJobReviewsProps) => {
  const { t } = useTranslation()
  const isFocused = useIsFocused()
  const listRef = useRef<FlatList | null>(null)

  const [currentIndex, setCurrentIndex] = useState(0)

  const { reviews, getFirstPage, canGetMoreItems, getMore, totalCount } =
    useGetUserReviews({ id: _id, limit: 10 })

  useEffect(() => {
    if (isFocused) getFirstPage()
  }, [isFocused, _id])

  const renderItem: ListRenderItem<TReview> = ({ item }) => (
    <FlexWrapper
      width={`${wp(100) - 40}px`}
      style={{
        padding: 10,
      }}>
      <UserEntities.ReviewCard
        key={item._id}
        isMyProfile
        width={`${wp(100) - 60}px`}
        {...item}
      />
    </FlexWrapper>
  )

  const onGetMore = () => {
    if (canGetMoreItems) {
      console.log('getMore')
      getMore()
    }
  }

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[]
  }) => {
    if (viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index)
    }
  }

  const viewabilityConfig = {
    minimumViewTime: 300,
    viewAreaCoveragePercentThreshold: 10,
  }

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ])

  const onNext = () => {
    if (currentIndex + 1 < reviews.length)
      listRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      })
  }

  const onPrev = () => {
    if (currentIndex + 1 > 1)
      listRef.current?.scrollToIndex({
        index: currentIndex - 1,
        animated: true,
      })
  }

  return (
    <>
      {!!reviews.length && (
        <View style={styles.main}>
          <H3SemiBold mBottom={'20px'}>{t('job_reviews')}</H3SemiBold>

          <FlatList
            keyExtractor={item => item._id}
            ref={listRef}
            data={reviews}
            pagingEnabled
            bounces={false}
            horizontal
            decelerationRate={'fast'}
            keyboardShouldPersistTaps={'handled'}
            renderItem={renderItem}
            onEndReached={onGetMore}
            showsHorizontalScrollIndicator={false}
            viewabilityConfigCallbackPairs={
              viewabilityConfigCallbackPairs.current
            }
          />

          {!!totalCount && (
            <PaginationController
              mTop={'20px'}
              onPressNext={onNext}
              onPressPrevious={onPrev}
              page={currentIndex + 1}
              totalPages={totalCount}
            />
          )}
        </View>
      )}
    </>
  )
}
