import React, { useEffect, useState } from 'react'
import Animated, {
  withTiming,
  interpolate,
  Extrapolation,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'

import { TIconsKeys } from '@assets/Svg'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'

import { Icon } from '../../Icon'
import { EColors } from '../../Styled'

import * as S from './styles'
import { TContainerProps } from './types'

export const Container = ({
  autoOpen = true,
  hasInstTop,

  dataLength = 0,
  searchLength = 0,
  resultLength = 0,

  dataHeight = 0,
  resultHeight = 0,

  inputChildren,
  children,
  onChangeOpen = () => {},
}: TContainerProps) => {
  const opened = useSharedValue(0)

  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(() => {
    onChangeOpen(isOpen)
  }, [isOpen])

  useEffect(() => {
    // if (autoOpen) {

    if (searchLength > 2 && !dataLength) {
      if (isOpen && !resultLength) {
        console.log('withTiming(2)')
        opened.value = withTiming(2)
      } else {
        console.log('withTiming(1) 1')

        opened.value = withTiming(2)
        setOpen(true)
      }
    }

    if (!searchLength && !!dataLength) {
      if (!isOpen) {
        console.log('withTiming(1) 2')

        opened.value = withTiming(1)
        setOpen(true)
      } else {
        console.log('withTiming(1) 3')

        opened.value = withTiming(1)
      }
    }

    if (searchLength > 2 && !!dataLength) {
      if (dataLength === 3) {
        console.log('withTiming(1) 4')

        opened.value = withTiming(1)
      } else {
        console.log('withTiming(2) 2')

        opened.value = withTiming(2)
      }
    }

    if (!searchLength && !dataLength) {
      console.log('withTiming(0)')

      opened.value = withTiming(0)
      setOpen(false)
    }
    // }
  }, [opened, dataLength, searchLength, resultLength, autoOpen])

  const onOpen = (val: boolean) => {
    // console.log('ANIM-onOpen-val', val)
    setOpen(val)

    // if (searchLength > 2 && !dataLength) {
    //   if (isOpen && !resultLength) {
    if (val) {
      if (dataLength < 3 && searchLength && resultLength) {
        // console.log('ANIM-isOpen-OPEN SECOND')
        opened.value = withTiming(2)
        return
      }

      if (searchLength) {
        opened.value = withTiming(2)
        return
      }
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
      <S.Header hasInstTop={hasInstTop}>
        {inputChildren && inputChildren()}

        <FlexWrapper style={S.styles.wrapper}>
          <Animated.View style={[animatedStyle]}>
            <Animated.ScrollView
              showsVerticalScrollIndicator={false}
              // scrollEnabled={isOpen ?? true}
            >
              {children}
            </Animated.ScrollView>
          </Animated.View>
        </FlexWrapper>

        <S.MoreButton onPress={() => onOpen(!isOpen)}>
          <Icon name={currentIcon} fill={EColors.transparent} />
        </S.MoreButton>
      </S.Header>
    </>
  )
}
