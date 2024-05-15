import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'
import {
  FlexWrapper,
  MMedium,
  MRegular,
  SMedium,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { Image as SharedImage } from '@/shared/ui/image'
import { styles, AbsoluteLocation } from './styles'
import { TListItemProps } from './types'
import { publicationActions } from '@/entities/Publication'
import { useDispatch } from 'react-redux'
import { iconMapping } from '@/features/Publication/iconConfig'
import { EColors } from '@/shared/ui/Styled'

export const ListItem = ({ publication }: TListItemProps) => {
  const [ratio, setRatio] = useState(1)
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const { heading, imageHeight, imageWidth } = publication

  const onItemPress = () => {
    dispatch(publicationActions.setState({ singlePublication: publication }))
    navigate(EScreens.ListPublicationStack, {
      screen: EScreens.PublicationScreen,
      params: {
        type: publication.type,
        id: publication._id,
      },
    })
  }

  useEffect(() => {
    if (imageHeight && imageWidth && imageHeight !== 1 && imageWidth !== 1) {
      setRatio(imageWidth / imageHeight)
    }
  }, [])

  return (
    <View style={styles.container}>
      {publication.type !== 'publication' && (
        <View style={styles.icon_wrapper}>
          <Icon name={iconMapping[publication.type]} size={30} />
        </View>
      )}

      <Touchable onPress={onItemPress}>
        <>
          <SharedImage.Standard
            type="publication"
            source={publication.images[0]}
            style={{
              ...styles.image,
              aspectRatio: ratio,
            }}
          />
          {!!publication.address && (
            <AbsoluteLocation>
              <Icon name={'LocationPoint'} size={16} />
              <SMedium mLeft={'5px'} numberOfLines={1}>
                {publication.address}
              </SMedium>
            </AbsoluteLocation>
          )}
        </>
      </Touchable>
      <FlexWrapper mTop="12px" justify="space-between">
        <FlexWrapper width={'auto'}>
          <Icon name={'MessagePublication'} size={20} />
          <MMedium mLeft={'8px'} color={EColors.grey_600}>
            {publication.projects || 0}
          </MMedium>
        </FlexWrapper>
        <FlexWrapper width={'auto'}>
          <Icon name={'Eye2'} size={20} />
          <MMedium mLeft={'8px'} color={EColors.grey_600}>
            {publication.views || 0}
          </MMedium>
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper mTop="12px" justify="space-between">
        <MRegular>{heading}</MRegular>
      </FlexWrapper>
    </View>
  )
}
