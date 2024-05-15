import React from 'react'
import { TOnboardingSliderImageProps } from './types'
import { Image } from 'react-native'
import { FlexWrapper, H1, MMedium, MRegular } from '../../Styled/Styled'
import { TextContainer, styles } from './styled'
import { EColors } from '../../Styled'

export const ImageComponent = ({
  image,
  imageText,
  width = 'auto',
  title,
  description,
}: TOnboardingSliderImageProps) => (
  <FlexWrapper width={width} flexDirection={'column'}>
    <FlexWrapper width={'auto'} mBottom={'50px'}>
      <Image source={image} style={styles.image} />
      <TextContainer>
        <MMedium color={EColors.white}>{imageText}</MMedium>
      </TextContainer>
    </FlexWrapper>

    <FlexWrapper
      width={width}
      flexDirection={'column'}
      style={{ paddingHorizontal: 16 }}>
      <H1>{title}</H1>

      <MRegular mTop={'16px'} align={'center'} color={EColors.grey_600}>
        {description}
      </MRegular>
    </FlexWrapper>
  </FlexWrapper>
)
