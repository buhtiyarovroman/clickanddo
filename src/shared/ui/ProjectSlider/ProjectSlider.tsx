import React, { useRef, useState } from 'react'
import { TProjectPreviewSliderProps } from './types'
import { StyledImage, Bottom, styles } from './styled'
import { TouchableOpacity, Dimensions } from 'react-native'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'

import { TImageViewRef } from '../ImageViewer/types'
import { ImageViewer } from '../ImageViewer'
import { getImageSource } from '@/shared/config'
import { Carousel } from '../AnimatedCarusel/AnimatedCarusel'
import { hp } from '../utils'
import { CarouselRenderItem } from 'react-native-reanimated-carousel'
import { TCarouselRef } from '../AnimatedCarusel/types'

const { width: viewportWidth } = Dimensions.get('window')

export const ProjectSlider = ({
  images = [],
  imageType = 'project',
}: TProjectPreviewSliderProps) => {
  const imageViewerRef = useRef<TImageViewRef | null>(null)
  const carouselRef = useRef<TCarouselRef | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const onPress = () => {
    imageViewerRef.current?.show()
  }

  const renderItem: CarouselRenderItem<string> = ({ item }) => {
    const isLocal = item.includes('/')
    return (
      <TouchableOpacity activeOpacity={1} onPress={onPress}>
        <StyledImage source={item} type={isLocal ? undefined : imageType} />
      </TouchableOpacity>
    )
  }
  return (
    <>
      <FlexWrapper flexDirection={'column'}>
        {/* <Animated.FlatList
          data={images}
          horizontal
          onScroll={onScrollHandler}
          pagingEnabled
          decelerationRate={'fast'}
          keyboardShouldPersistTaps={'handled'}
          showsHorizontalScrollIndicator={false}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={renderItem}
          nestedScrollEnabled
        /> */}

        <Carousel
          ref={carouselRef}
          data={images}
          width={viewportWidth}
          renderItem={renderItem}
          height={300}
          onSnapToItem={setActiveSlide}
          withPagination
          dotContainerStyle={styles.dotContainer}
          mode={'normal-horizontal'}
        />

        <Bottom />
      </FlexWrapper>

      <ImageViewer
        ref={imageViewerRef}
        data={getImageSource(images, imageType)}
        index={activeSlide}
      />
    </>
  )
}
