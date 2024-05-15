import { useTypedSelector } from '@/app/store'
import { FavoritesEntities } from '@/entities/Favorites'
import { TFavoriteType } from '@/entities/Favorites/models'
import { favoritesActions } from '@/entities/Favorites/store/actions'
import { getFavoritesSelector } from '@/entities/Favorites/store/selectors'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'

type TFavoriteProps = {
  id: string
}

type TFavoriteAddProps = {
  favorite: string
  hashtag: string
  name: string
  type: TFavoriteType
}

export const useFavorite = ({ id }: TFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const { favorites } = useTypedSelector(getFavoritesSelector)

  const dispatch = useDispatch()

  const onGetFavoriteId = () => {
    if (!id) return
    FavoritesEntities.FavoritesService.getFavoritesById({ id })
      .then(res => {
        if (!!res.data.favorite) setIsFavorite(true)
      })
      .catch(() => {
        setIsFavorite(false)
      })
  }

  useEffect(() => {
    onGetFavoriteId()
  }, [id])

  const onFavoritePress = async (data: TFavoriteAddProps) => {
    console.log('data favorite =>', data)
    if (!isFavorite) {
      try {
        const { data: favoriteData } =
          await FavoritesEntities.FavoritesService.addToFavorites(data)

        Toast.show({
          text2: 'toasts.favorite_added',
          type: 'success',
        })
        dispatch(
          favoritesActions.setState({
            favorites: [
              ...favorites,
              { _id: favoriteData._id, favorite: favoriteData },
            ],
          }),
        )
      } catch (err) {
        Toast.show({ text2: 'Error adding to favorites', type: 'error' })
        console.log(err)
      }

      return
    }

    try {
      await FavoritesEntities.FavoritesService.deleteFromFavorites(id)

      dispatch(
        favoritesActions.setState({
          favorites: favorites.filter(el => el.favorite._id !== id),
        }),
      )

      Toast.show({
        text2: 'toasts.favorite_removed',
        type: 'success',
      })
    } catch (err) {
      Toast.show({ text2: 'Error removing from favorites', type: 'error' })
      console.log(err)
    }
  }
  return { onFavoritePress }
}
