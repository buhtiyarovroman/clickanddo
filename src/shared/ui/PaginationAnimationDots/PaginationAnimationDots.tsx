import React from 'react'
import { TPaginationAnimationDotsProps } from './types'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { AnimatedDot } from './ui'

const MAX_DOTS = 10

export const PaginationAnimationDots = ({
  length = 0,
  currentIndex = 0,
  dotMargin = 7,
  x,
  ...props
}: TPaginationAnimationDotsProps) => {
  const array = Array.from({ length: length }, (_, index) => index)

  const onFilterDots = () => {
    if (length >= 10) {
      if (currentIndex >= length - 5) {
        return array.slice(length - 10, length)
      }

      if (currentIndex > 5) {
        return array.slice(currentIndex - 5, currentIndex + 5)
      }

      if (currentIndex <= 5) {
        return array.slice(0, MAX_DOTS)
      }
    }

    return array
  }

  const renderDots = (item: number) => {
    return <AnimatedDot key={item} currentIndex={item} {...{ x, dotMargin }} />
  }

  return (
    <FlexWrapper {...props} width={'auto'}>
      {onFilterDots().map(renderDots)}
    </FlexWrapper>
  )
}
