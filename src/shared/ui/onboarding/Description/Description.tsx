import React from 'react'
import { TOnboardingSliderDescriptionProps } from './types'
import { FlexWrapper, H1, MRegular } from '../../Styled/Styled'
import { EColors } from '../../Styled'

export const Description = ({
  title,
  description,
  width,
}: TOnboardingSliderDescriptionProps) => {
  return (
    <FlexWrapper
      width={width}
      flexDirection={'column'}
      style={{ paddingHorizontal: 16 }}>
      <H1>{title}</H1>

      <MRegular mTop={'16px'} align={'center'} color={EColors.grey_600}>
        {description}
      </MRegular>
    </FlexWrapper>
  )
}
