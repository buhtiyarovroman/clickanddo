import * as S from './styled'
import React from 'react'
import { LMedium } from '@/shared/ui/Styled/Styled'
import { TLocationPlaceItemProps } from './types'

export const PlaceItem = ({
  place,
  onPress = () => {},
}: TLocationPlaceItemProps) => {
  return (
    <S.Container
      onPress={() => onPress(place?.place_id || '', place?.description || '')}>
      <LMedium numberOfLines={2}>{place?.description}</LMedium>
    </S.Container>
  )
}
