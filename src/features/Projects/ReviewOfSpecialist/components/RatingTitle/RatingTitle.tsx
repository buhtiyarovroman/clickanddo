import React from 'react'
import { TRatingTitle } from './types'
import { FlexWrapper, LRegular, MRegular } from '@/shared/ui/Styled/Styled'
import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'

export const RatingTitle = ({ title = '', error, ...props }: TRatingTitle) => {
  return (
    <FlexWrapper align={'flex-start'} flexDirection={'column'}>
      <FlexWrapper justify={'space-between'} mBottom={'10px'}>
        <LRegular color={EColors.grey_600}>{title}</LRegular>

        <Input.Rating {...props} />
      </FlexWrapper>
      {error && <MRegular color={EColors.error}>{error}</MRegular>}
    </FlexWrapper>
  )
}
