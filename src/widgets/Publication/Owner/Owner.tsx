import { View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../styles'
import { Image } from '@/shared/ui/image'

import {
  FlexWrapper,
  LRegular,
  MRegular,
  MSemibold,
} from '@/shared/ui/Styled/Styled'
import { useGetUserById } from '@/features/User/hooks'
import { TOwnerProps } from './types'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { Loader } from '@/shared/ui/loader'
import { useCheckFavorites } from '@/features/Favorites'

export const Owner = ({ id }: TOwnerProps) => {
  const { user: owner } = useGetUserById({ id })
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const { loading, inFavorites, onAddFavorite, onDeleteFavorite, addLoading } =
    useCheckFavorites({ id })

  const [localSubscribe, setLocalSubscribe] = useState(0)
  const onOwnerNamePress = () => {
    navigate(EScreens.ListJobs, {
      screen: EScreens.JobProfile,
      params: { id },
    })
  }

  const onPressSubscribe = () => {
    if (inFavorites) {
      onDeleteFavorite(id)
      setLocalSubscribe(localSubscribe - 1)
      return
    }

    if (!owner) return

    onAddFavorite({
      favorite: id,
      hashtag: owner?.hashtag?.[0]?._id,
      name: owner.name || '' + ' ' + owner.secondName || '',
      type: 'specialist',
    })

    setLocalSubscribe(localSubscribe + 1)
  }

  return (
    <View style={styles.section}>
      <FlexWrapper justify="space-between">
        <TouchableOpacity
          onPress={onOwnerNamePress}
          activeOpacity={0.6}
          style={styles.name_touchable}>
          <View style={styles.photo_wrapper}>
            <Image.Standard
              type="user"
              source={owner?.photo}
              height="100%"
              width="100%"
            />
          </View>
          <FlexWrapper mLeft="10px" style={styles.name_subscribers}>
            <MSemibold>{owner?.name}</MSemibold>
            <MRegular>
              {t('subscribers_quantity', {
                value: (owner?.subscribers || 0) + localSubscribe,
              })}
            </MRegular>
          </FlexWrapper>
        </TouchableOpacity>
        <FlexWrapper width="auto" justify="space-between">
          {/* Add Favorite Button */}
          <Button.Standard
            style={{
              backgroundColor: inFavorites ? EColors.grey_200 : EColors.primary,
            }}
            disabled={addLoading || loading}
            onPress={onPressSubscribe}
            width="130px"
            height="44px">
            {loading && <Loader.Standard color={EColors.white} />}
            {!loading && (
              <LRegular color={inFavorites ? EColors.black : EColors.white}>
                {inFavorites && t('unsubscribe')}
                {!inFavorites && t('subscribe')}
              </LRegular>
            )}
          </Button.Standard>
        </FlexWrapper>
      </FlexWrapper>
    </View>
  )
}
