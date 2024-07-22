import React, { useState, useEffect } from 'react'
import { FlexWrapper } from '../../shared/ui/Styled/Styled'
import Animated, {
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { THashtagAccordionProps } from './types'
import { TIconsKeys } from '@assets/Svg'
import * as S from './styled'
import { Icon } from '../../shared/ui/Icon'
import { HashtagList } from './ui'
import { EColors } from '@/shared/ui/Styled'

export const HashtagAccordion = ({
  autoOpen = true,
  searchLength = 0,
  getDataHeight = () => {},
  ...props
}: THashtagAccordionProps) => {
  const opened = useSharedValue(0)

  const [isOpen, setOpen] = useState<boolean>(false)
  const [dataHeight, setDataHeight] = useState<number>(0)
  const [resultHeight, setResultHeight] = useState<number>(0)

  useEffect(() => {
    if (isOpen) {
      getDataHeight(dataHeight + resultHeight)
      return
    }
    getDataHeight(0)
  }, [dataHeight, resultHeight, isOpen])

  useEffect(() => {
    // if (autoOpen) {
    if (searchLength > 2 && !props.selectedHashtag.length) {
      if (isOpen && !props.searchableHashtag.length) {
        opened.value = withTiming(2)
      } else {
        opened.value = withTiming(2)
        setOpen(true)
      }
    }

    if (!searchLength && !!props.selectedHashtag.length) {
      if (!isOpen) {
        opened.value = withTiming(1)
        setOpen(true)
      } else {
        opened.value = withTiming(1)
      }
    }

    if (searchLength > 2 && !!props.selectedHashtag.length) {
      if (props.selectedHashtag.length === 3) {
        opened.value = withTiming(1)
      } else {
        opened.value = withTiming(2)
      }
    }

    if (!searchLength && !props.selectedHashtag.length) {
      opened.value = withTiming(0)
      setOpen(false)
    }
    // }
  }, [
    opened,
    props.selectedHashtag.length,
    searchLength,
    props.searchableHashtag.length,
    autoOpen,
  ])

  const onOpen = (val: boolean) => {
    // console.log('ANIM-onOpen-val', val)
    setOpen(val)

    if (val) {
      if (
        props.selectedHashtag.length < 3 &&
        searchLength &&
        props.searchableHashtag.length
      ) {
        // console.log('ANIM-isOpen-OPEN SECOND')
        opened.value = withTiming(2)
        return
      }

      // console.log('ANIM-isOpen-OPEN FIRST')
      opened.value = withTiming(1)
      return
    }

    // console.log('ANIM-CLOSE')
    opened.value = withTiming(0)
  }

  const animatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      opened.value,
      [0, 1, 2],
      [0, dataHeight, resultHeight + dataHeight],
      Extrapolation.CLAMP,
    )

    const opacity = interpolate(
      opened.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    )

    return {
      height,
      opacity,
      width: '100%',
      // backgroundColor: 'green',
    }
  })

  const currentIcon: TIconsKeys = isOpen ? 'AngleArrowUp' : 'AngleArrowDown'

  return (
    <>
      <FlexWrapper style={S.styles.wrapper}>
        <Animated.View style={[animatedStyle]}>
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            // scrollEnabled={isOpen ?? true}
          >
            <HashtagList {...props} {...{ setDataHeight, setResultHeight }} />
          </Animated.ScrollView>
        </Animated.View>
      </FlexWrapper>

      {!!searchLength &&
        (!!props.selectedHashtag.length ||
          !!props.searchableHashtag.length) && (
          <S.MoreButton onPress={() => onOpen(!isOpen)}>
            <Icon name={currentIcon} fill={EColors.transparent} />
          </S.MoreButton>
        )}
    </>
  )
}
