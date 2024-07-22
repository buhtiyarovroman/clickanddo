import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  autoPlayInterval,
  carouselHeight,
  carouselWidth,
  scrollAnimationDuration,
} from './consts'
import { ExpandingDot } from 'react-native-animated-pagination-dots'
import ReanimatedCarousel from 'react-native-reanimated-carousel'
import { Animated } from 'react-native'
import { styles, Container, DotContainer } from './styled'
import { TCarouselProps, TCarouselRef } from './types'
import { ICarouselInstance } from 'react-native-reanimated-carousel/lib/typescript/types'
import { EColors } from '../Styled'

export const Carousel = forwardRef<TCarouselRef, TCarouselProps>(
  (
    {
      withPagination = false,
      data,
      renderItem,
      width,
      height,
      loop = false,
      onSnapToItem,
      dotContainerStyle = {},
      mode = 'parallax',
    }: TCarouselProps,
    ref,
  ) => {
    const carouselRef = useRef<ICarouselInstance | null>(null)
    const cHeight = height ?? carouselHeight
    const cWidth = width ?? carouselWidth

    const scrollX = useRef(new Animated.Value(0)).current

    useImperativeHandle(ref, () => carouselRef.current)

    const onProgressChange = (offsetProgress: number) => {
      Animated.timing(scrollX, {
        toValue: Math.abs(offsetProgress),
        useNativeDriver: false,
        duration: 0,
      }).start()
    }

    return (
      <Container>
        <ReanimatedCarousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          ref={carouselRef}
          loop={loop}
          width={cWidth}
          height={cHeight}
          autoPlay={false}
          onProgressChange={onProgressChange}
          onScrollEnd={onSnapToItem}
          modeConfig={{
            parallaxAdjacentItemScale: 0.8,
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          data={data ?? []}
          autoPlayInterval={autoPlayInterval}
          scrollAnimationDuration={scrollAnimationDuration}
          renderItem={renderItem}
          mode={mode}
        />

        {!!withPagination && (
          <DotContainer style={dotContainerStyle}>
            <ExpandingDot
              data={(data as Object[]) ?? []}
              expandingDotWidth={16}
              scrollX={scrollX}
              activeDotColor={EColors.primary}
              inActiveDotColor={EColors.primary_L2}
              inActiveDotOpacity={0.3}
              dotStyle={styles.dotStyle}
              containerStyle={styles.containerStyle}
            />
          </DotContainer>
        )}
      </Container>
    )
  },
)
