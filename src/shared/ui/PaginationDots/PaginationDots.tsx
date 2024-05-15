import React from 'react'
import { TPaginationDotsProps } from './types'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { AnimatedDot } from './ui'

export const PaginationDots = ({
  length = 0,
  currentIndex = 0,
  dotMargin = 7,
  ...props
}: TPaginationDotsProps) => {
  const array = Array.from({ length: length }, (_, index) => index)

  const renderDots = (item: number, index: number) => {
    const isActive = index === currentIndex
    return <AnimatedDot key={item} dotMargin={dotMargin} active={isActive} />
  }

  return (
    <FlexWrapper {...props} width={'auto'}>
      {array.map(renderDots)}
    </FlexWrapper>
  )
}
