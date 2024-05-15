import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { FlexWrapper, LRegular } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { styles } from '../styles'

import { TActionsProps } from './types'
import Toast from 'react-native-toast-message'
import { useTypedSelector } from '@/app/store'
import { getFavoritesSelector } from '@/entities/Favorites/store/selectors'
import { useDispatch } from 'react-redux'
import { TPostPublicationRateRequest } from '@/entities/Publication/models'
import { PublicationService } from '@/entities/Publication/services'
import { publicationActions } from '@/entities/Publication'
import { ShareButton } from '@/features/Publication/Share'
import { Loader } from '@/shared/ui/loader'
import { useCheckFavorites } from '@/features/Favorites'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { getUserSelector } from '@/entities/User'
import { PublicationWidgets } from '..'
import { PublicationFeatures } from '@/features/Publication'

export const Actions = ({
  publication,
  type,
  onGetPublication = () => {},
}: TActionsProps) => {
  const { t } = useTranslation()
  const { favorites } = useTypedSelector(getFavoritesSelector)
  const { user } = useTypedSelector(getUserSelector)

  const dispatch = useDispatch()
  const { navigate } = useNavigation()

  const { loading, inFavorites, onAddFavorite, onDeleteFavorite } =
    useCheckFavorites({ id: publication._id })

  const isMy = user?._id === publication?.owner

  const isCustomer = user?.role === 'customer'

  const [currentRate, setCurrentRate] = useState<
    TPostPublicationRateRequest['payload']['action']
  >(publication.userVote)

  useEffect(() => {
    setCurrentRate(publication.userVote)
  }, [publication.userVote])

  const isFavorite = !!favorites.find(el => el.favorite._id === publication._id)

  const onPressRate = async (
    action: TPostPublicationRateRequest['payload']['action'],
  ) => {
    try {
      await PublicationService.postPublicationRate({
        id: publication._id,
        action,
      })

      currentRate === action ? setCurrentRate(null) : setCurrentRate(action)

      dispatch(
        publicationActions.getSinglePublicationRequest({ id: publication._id }),
      )
    } catch (err) {
      console.error('onPressRate err =>', err)
    }
  }

  const onAddToFavoritesPress = async () => {
    if (isFavorite) {
      onDeleteFavorite(publication._id)

      Toast.show({
        text2: 'favorite_removed',
        type: 'success',
      })

      return
    }

    onAddFavorite({
      favorite: publication._id,
      hashtag: publication.hashtag[0]._id,
      name: publication.heading,
      type: publication.type,
    })

    Toast.show({
      text2: 'toasts.favorite_added',
      type: 'success',
    })
  }

  const onNavigateToResponses = () => {
    if (!publication) return

    navigate(EScreens.PublicationResponses, {
      id: publication._id,
      type: publication.type,
      projects: publication.projects,
    })
  }

  return (
    <View style={styles.section_borderless}>
      {isCustomer && (
        <FlexWrapper justify="space-between" mBottom={'20px'}>
          <FlexWrapper width="28%" justify="space-between">
            {/* Like button */}
            <Button.Standard
              onPress={() => onPressRate('like')}
              style={styles.small_button}>
              <Icon
                name="ThumbUp"
                size={20}
                fill={currentRate === 'like' ? EColors.primary : EColors.black}
              />
            </Button.Standard>

            {/* Dislike button */}
            <Button.Standard
              onPress={() => onPressRate('dislike')}
              style={styles.small_button}>
              <Icon
                name="ThumbDown"
                size={20}
                fill={
                  currentRate === 'dislike' ? EColors.primary : EColors.black
                }
              />
            </Button.Standard>
          </FlexWrapper>
          <FlexWrapper width="62%" justify="space-between">
            {/* Add to favorites button */}
            <Button.Standard
              onPress={onAddToFavoritesPress}
              style={{
                ...styles.favorites_button,
                backgroundColor: inFavorites
                  ? EColors.grey_600
                  : EColors.primary,
              }}>
              {loading && <Loader.Standard color={EColors.white} />}

              {!loading && (
                <>
                  <Icon
                    name={inFavorites ? 'HeartFillDisable' : 'HeartFill'}
                    fill={EColors.white}
                  />
                  <LRegular color={EColors.white} mLeft="5px">
                    {inFavorites ? t('from_favorites') : t('to_favorites')}
                  </LRegular>
                </>
              )}
            </Button.Standard>

            {/* Share button */}
            <ShareButton publication={publication} />
          </FlexWrapper>
        </FlexWrapper>
      )}

      {isMy && (
        <>
          <PublicationWidgets.EditPublicationButton
            {...{ type, publication }}
          />
          <Button.Standard
            mTop={'16px'}
            text={t('responses')}
            onPress={onNavigateToResponses}
          />
        </>
      )}

      {!isMy && (
        <PublicationFeatures.Response
          publication={publication}
          onRefresh={onGetPublication}
        />
      )}
    </View>
  )
}
