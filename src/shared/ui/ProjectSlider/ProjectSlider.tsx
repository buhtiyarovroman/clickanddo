import React, { useRef, useState } from 'react'
import { TProjectPreviewSliderProps } from './types'
import { PaginationContainer, StyledImage, Bottom } from './styled'
import { Dimensions, ListRenderItem, ViewToken } from 'react-native'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { PaginationAnimationDots } from '@/shared/ui/PaginationAnimationDots'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated'

export const ProjectSlider = ({
  images = [],
  imageType = 'project',
}: TProjectPreviewSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const x = useSharedValue(0)

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

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    },
  })

  const renderItem: ListRenderItem<string> = ({ item }) => {
    const isLocal = item.includes('/')
    return <StyledImage source={item} type={isLocal ? undefined : imageType} />
  }
  return (
    <FlexWrapper flexDirection={'column'}>
      <Animated.FlatList
        data={images}
        horizontal
        onScroll={onScrollHandler}
        pagingEnabled
        decelerationRate={'fast'}
        keyboardShouldPersistTaps={'handled'}
        showsHorizontalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        renderItem={renderItem}
        nestedScrollEnabled
      />

      <PaginationContainer>
        <PaginationAnimationDots
          length={images.length}
          x={x}
          currentIndex={currentIndex}
        />
      </PaginationContainer>

      <Bottom />
    </FlexWrapper>
  )
}
