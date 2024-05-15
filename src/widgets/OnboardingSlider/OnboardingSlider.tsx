import React, { useRef } from 'react'
import { OnboardingData } from './data'
import { ButtonContainer } from './styled'
import { TOnboardingItem } from './types'
import { Dimensions, FlatList, ViewToken } from 'react-native'
import { OnboardingItems } from '@/shared/ui/onboarding'
import { Button } from '@/shared/ui/button'
import { LMedium } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { useNavigation } from '@/features/hooks'
import { useDispatch } from 'react-redux'
import { PaginationAnimationDots } from '@/shared/ui/PaginationAnimationDots'
import { useTranslation } from 'react-i18next'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import { userActions } from '@/entities/User'
import { EScreens } from '@/app/navigation'

const { width: viewportWidth } = Dimensions.get('window')

export const OnboardingSlider = () => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const flatListRef = useAnimatedRef<FlatList<TOnboardingItem[]>>()
  const flatListIndex = useSharedValue(0)
  const x = useSharedValue(0)

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[]
  }) => {
    if (viewableItems[0]) {
      if (viewableItems[0].index !== null) {
        flatListIndex.value = viewableItems[0].index
      }
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

  const onNextBanner = () => {
    // console.log(`${x.value} === ${viewportWidth * 2}`)
    if (flatListIndex.value === 2) {
      dispatch(userActions.setSeeOnboarding(true))
      navigate(EScreens.AuthMain)
      return
    }
    if (flatListIndex.value === 0 || flatListIndex.value === 1) {
      flatListRef.current?.scrollToIndex({ index: x.value / viewportWidth + 1 })
    }
  }

  return (
    <>
      <Animated.FlatList
        ref={flatListRef}
        data={OnboardingData}
        horizontal
        bounces={false}
        onScroll={onScrollHandler}
        pagingEnabled
        snapToInterval={viewportWidth}
        // getItemLayout={}
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

      <PaginationAnimationDots length={OnboardingData.length} x={x} />

      <ButtonContainer>
        <Button.Standard
          mTop={'34px'}
          onPress={onNextBanner}
          color={EColors.grey_900}>
          <LMedium mRight={'10px'} color={EColors.white}>
            {t('next')}
          </LMedium>
          <Icon name={'ArrowRight'} size={18} />
        </Button.Standard>
      </ButtonContainer>
    </>
  )
}
