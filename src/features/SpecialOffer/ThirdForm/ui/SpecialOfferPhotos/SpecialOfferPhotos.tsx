import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import React from 'react'
import {
  EmptyPhoto,
  PlusContainer,
  SpecialOffersPhoto,
  ImageDelete,
} from './styled'
import { TSpecialOfferPhotosProps } from './types'
import { v4 as uuidv4 } from 'uuid'

export const SpecialOfferPhotos = ({
  images = [],
  onChange = () => {},
}: TSpecialOfferPhotosProps) => {
  const emptyArray = Array.from(
    { length: 5 - images.length },
    (_, index) => index + 1,
  )

  const _onChange = (paths: string[]) => {
    const data = paths.map(item => ({ id: uuidv4(), path: item }))
    onChange([...images, ...data])

    console.log('_onChange =>', [...images, ...data])
  }

  const onDelete = (id: string) => {
    onChange(images.filter(item => item.id !== id))
  }

  const renderEmpty = (index: number) => {
    return (
      <>
        <Input.PhotoMenu
          key={index}
          onGetPhotoArrayPath={_onChange}
          multiple
          maxFiles={emptyArray.length}
          renderContent={() => (
            <EmptyPhoto mRight={'8px'}>
              <PlusContainer>
                <Icon name={'Plus'} stroke={EColors.grey_500} size={16} />
              </PlusContainer>
            </EmptyPhoto>
          )}
        />
      </>
    )
  }

  const renderPhoto = (item: { id: string; path: string }) => {
    const type = item.path.includes('/') ? undefined : 'publication'
    return (
      <FlexWrapper
        key={item.id}
        width={'108px'}
        height={'134px'}
        mRight={'8px'}
        mBottom={'8px'}>
        <ImageDelete onPress={() => onDelete(item.id)}>
          <Icon name={'Close'} size={10} stroke={EColors.black} />
        </ImageDelete>
        <SpecialOffersPhoto type={type} source={item.path} />
      </FlexWrapper>
    )
  }

  return (
    <FlexWrapper justify={'flex-start'} wrap={'wrap'}>
      {images.map(renderPhoto)}
      {emptyArray.map(renderEmpty)}
    </FlexWrapper>
  )
}
