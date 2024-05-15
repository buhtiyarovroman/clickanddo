import React from 'react'

import { StyledImage } from '@/widgets/SpecialistsList/styles'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  LSemibold,
  MRegular,
  SRegular,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import { TSpecialistCardProps } from './types'
import { styles, SpecialistCardContainer } from './styles'
import { getTranslate } from '@/shared/utils'
import { useCheckFavorites } from '@/features/Favorites'

export const SpecialistCard = ({
  item,
  onPress = () => {},
  width = '100%',
  ...props
}: TSpecialistCardProps) => {
  const { inFavorites, onAddFavorite, onDeleteFavorite } = useCheckFavorites({
    id: item._id,
  })

  const onPressFavorite = () => {
    if (inFavorites) {
      onDeleteFavorite(item._id)
      return
    }

    onAddFavorite({
      favorite: item._id,
      name: `${item.name || ''} ${item.secondName || ''}`,
      hashtag: item.hashtag?.[0]?._id,
      type: 'specialist',
    })
  }
  return (
    <SpecialistCardContainer {...props} width={width} onPress={onPress}>
      <StyledImage type="user" source={item.photo} />
      <FlexWrapper
        mLeft="20px"
        width="45%"
        flexDirection="column"
        justify="flex-start"
        align="flex-start">
        <LSemibold numberOfLines={1}>
          {item.name} {item.secondName}
        </LSemibold>

        <MRegular color={EColors.grey_600} mTop={'5px'} numberOfLines={2}>
          {item.description}
        </MRegular>

        {!!item.category?.title.length && (
          <MRegular>{getTranslate(item.category?.title || [])}</MRegular>
        )}

        <FlexWrapper mTop={'5px'} justify="flex-start">
          <Icon name="Star" size={18} />
          <FlexWrapper width={'auto'}>
            <SRegular mLeft="3px">{item.rating?.toFixed(2)}</SRegular>
            <SRegular mLeft="3px">({item.totalVotes})</SRegular>
          </FlexWrapper>
        </FlexWrapper>
      </FlexWrapper>

      <Touchable
        width={'auto'}
        onPress={onPressFavorite}
        style={styles.iconWrapper}>
        <Icon
          name={inFavorites ? 'HeartFill' : 'HeartEmpty'}
          fill={inFavorites ? EColors.error : EColors.transparent}
          size={30}
        />
      </Touchable>
    </SpecialistCardContainer>
  )
}
