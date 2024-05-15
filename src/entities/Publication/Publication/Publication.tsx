import React from 'react'
import { TUserPublicationProps } from './types'
import { SectionContainer, StyledImage } from './styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'

export const Publication = ({
  onPress = () => {},
  width = '45%',
  images = [],
  heading = '',
  imageType = 'project',
  ...props
}: TUserPublicationProps) => {
  const photo = images[0] || ''

  return (
    <SectionContainer onPress={onPress} width={width} {...props}>
      <StyledImage type={imageType} source={photo} />

      <FlexWrapper mTop={'12px'} justify={'center'}>
        <MRegular numberOfLines={1}>{heading}</MRegular>
      </FlexWrapper>
    </SectionContainer>
  )
}
