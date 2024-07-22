import React, { useRef, useState } from 'react'
import { OnboardingData } from './data'
import { ButtonContainer } from './styled'
import { TOnboardingItem } from './types'
import { Dimensions } from 'react-native'
import { OnboardingItems } from '@/shared/ui/onboarding'
import { Button } from '@/shared/ui/button'
import { FlexWrapper, LMedium } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { useNavigation } from '@/features/hooks'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { userActions } from '@/entities/User'
import { EScreens } from '@/app/navigation'
import { Carousel } from '@/shared/ui/AnimatedCarusel/AnimatedCarusel'
import { hp } from '@/shared/ui/utils'
import { TCarouselRef } from '@/shared/ui/AnimatedCarusel/types'
import { CarouselRenderItem } from 'react-native-reanimated-carousel'
import { Background } from '@/shared/ui/background'

const { width: viewportWidth } = Dimensions.get('window')

export const OnboardingSlider = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()
  const carouselRef = useRef<TCarouselRef | null>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const dispatch = useDispatch()

  const onNextBanner = () => {
    // console.log(`${x.value} === ${viewportWidth * 2}`)
    // if (flatListIndex.value === 2) {
    //   dispatch(userActions.setSeeOnboarding(true))
    //   navigate(EScreens.AuthMain)
    //   return
    // }
    // if (flatListIndex.value === 0 || flatListIndex.value === 1) {
    //   flatListRef.current?.scrollToIndex({ index: x.value / viewportWidth + 1 })
    // }
    if (activeSlide === OnboardingData.length - 1) {
      dispatch(userActions.setSeeOnboarding(true))
      navigate(EScreens.AuthMain)
    } else {
      carouselRef.current?.next()
    }
  }

  const renderSlide: CarouselRenderItem<TOnboardingItem> = ({ item }) => (
    <OnboardingItems.ImageComponent {...item} width={`${viewportWidth}px`} />
  )

  return (
    <Background.SafeArea edges={['top', 'bottom']}>
      <FlexWrapper flexDirection={'column'} height={'100%'}>
        <Carousel
          ref={carouselRef}
          data={OnboardingData}
          renderItem={renderSlide}
          height={hp(70)}
          withPagination
          onSnapToItem={setActiveSlide}
          mode={'normal-horizontal'}
        />

        <ButtonContainer>
          <Button.Standard
            mTop={'20px'}
            onPress={onNextBanner}
            color={EColors.grey_900}>
            <LMedium mRight={'10px'} color={EColors.white}>
              {t('next')}
            </LMedium>
            <Icon name={'ArrowRight'} size={18} />
          </Button.Standard>
        </ButtonContainer>
      </FlexWrapper>
    </Background.SafeArea>
  )
}

{
  /* <Animated.FlatList
ref={flatListRef}
data={OnboardingData}
horizontal
bounces={false}
onScroll={onScrollHandler}
pagingEnabled
snapToInterval={viewportWidth}
decelerationRate={'fast'}
keyboardShouldPersistTaps={'handled'}
showsHorizontalScrollIndicator={false}
onScrollToIndexFailed={() => {}}
viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
renderItem={({ item }) => (
  <OnboardingItems.ImageComponent
    {...item}
    width={`${viewportWidth}px`}
  />
)}
/>

<PaginationAnimationDots length={OnboardingData.length} x={x} /> */
}
