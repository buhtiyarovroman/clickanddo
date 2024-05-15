import React from 'react'
import i18next from 'i18next'

import { FlexWrapper, SMedium } from '@/shared/ui/Styled/Styled'

import { TCategoryCardProps } from './types'
import { CategoryContainer, styles, ImageContainer } from './styled'
import { images } from '@/shared/config'

export const CategoryCard = ({
  image,
  title = [],
  onPress,
  width = '45%',
  ...props
}: TCategoryCardProps) => {
  const currentTitle =
    title.find(el => el.lang === i18next.language)?.value || ''

  return (
    <CategoryContainer onPress={onPress} width={width} {...props}>
      <ImageContainer source={{ uri: images.interestCategory + image }}>
        <FlexWrapper
          style={styles.button}
          width={'55%'}
          height={'100%'}
          align={'flex-start'}
          flexDirection={'column'}>
          <SMedium numberOfLines={2}>{currentTitle}</SMedium>
        </FlexWrapper>
      </ImageContainer>
    </CategoryContainer>
  )
}
