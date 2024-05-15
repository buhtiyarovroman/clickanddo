import { View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-snap-carousel'
import { PaginationDots } from '@/shared/ui/PaginationDots'
import { Image } from '@/shared/ui/image'
import { styles } from './styles'
import { TSliderProps } from './types'
const { width: viewportWidth } = Dimensions.get('window')
export const Slider = ({ images }: TSliderProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  return (
    <>
      <View style={styles.container}>
        <Carousel
          scrollEnabled={images.length > 1}
          autoplay={false}
          loop={false}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth}
          slideStyle={{
            width: viewportWidth,
          }}
          onSnapToItem={setActiveSlide}
          enableMomentum={false}
          decelerationRate="fast"
          nestedScrollEnabled
          windowSize={300}
          renderItem={({ item }) => (
            <Image.Standard
              type="publication"
              width="100%"
              height="100%"
              source={item as string}
            />
          )}
          data={images}
        />
      </View>

      {images.length > 1 && (
        <PaginationDots
          dotMargin={3}
          mTop={'10px'}
          currentIndex={activeSlide}
          length={images.length >= 5 ? 5 : images.length}
        />
      )}
    </>
  )
}
