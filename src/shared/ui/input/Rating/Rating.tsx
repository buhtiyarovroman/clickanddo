import React from 'react'
import { TRatingProps } from './types'
import { StyledContainer, StyledStarContainer } from './styled'
import { Icon } from '../../Icon'
import { EColors } from '../../Styled'

export const Rating = ({
  value = 0,
  onChange = () => {},
  size = 20,
  mStar = '8px',
}: TRatingProps) => {
  const array = Array.from({ length: 5 }, (_, index) => index + 1)

  const renderStar = (item: number) => {
    const isActive = item <= value
    const isLast = item === array.length

    const currentMargin = isLast ? '0px' : mStar
    return (
      <StyledStarContainer
        mRight={currentMargin}
        onPress={() => onChange(item)}>
        <Icon
          name={'Star'}
          size={size}
          fill={isActive ? EColors.warning : EColors.grey_400}
        />
      </StyledStarContainer>
    )
  }
  return <StyledContainer>{array.map(renderStar)}</StyledContainer>
}
