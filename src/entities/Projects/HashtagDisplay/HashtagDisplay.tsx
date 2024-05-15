import React from 'react'
import { TProjectPreviewHashtagDisplayProps } from './types'
import { FlexWrapper, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { THashTag } from '@/entities/User/models'
import { HashtagContainer } from './styled'
import { getTranslate } from '@/shared/utils'

export const HashtagDisplay = ({
  hashtag = [],
}: TProjectPreviewHashtagDisplayProps) => {
  const renderItem = (item: THashTag) => {
    return (
      <HashtagContainer key={item._id}>
        <SRegular color={EColors.grey_600}>{getTranslate(item.title)}</SRegular>
      </HashtagContainer>
    )
  }
  return (
    <>
      <FlexWrapper
        mBottom={'10px'}
        wrap={'wrap'}
        align={'flex-start'}
        justify={'flex-start'}>
        {hashtag.map(renderItem)}
      </FlexWrapper>
    </>
  )
}
