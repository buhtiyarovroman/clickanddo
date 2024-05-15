import { useTypedSelector } from '@/app/store'
import { TAddToFavorites } from '@/entities/Favorites/models/addToFavorites'
import { FavoritesService } from '@/entities/Favorites/services'
import { favoritesActions } from '@/entities/Favorites/store/actions'
import { getFavoritesSelector } from '@/entities/Favorites/store/selectors'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

type TProps = {
  id: string
  disableCheck?: boolean
}

export const useCheckFavorites = ({ id, disableCheck = false }: TProps) => {
  const [loading, setLoading] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [inFavorites, setInFavorites] = useState(false)
  const dispatch = useDispatch()
  const { favorites } = useTypedSelector(getFavoritesSelector)

  const onCheck = async () => {
    try {
      setLoading(true)

      const data = await FavoritesService.getSearchById({ id })

      if (data.data) {
        setInFavorites(true)
        return
      }
      setInFavorites(false)
    } catch (err) {
      setInFavorites(false)

      console.error('useCheckFavorites err =>', err)
    } finally {
      setLoading(false)
    }
  }

  const _onAddFavorite = async (data: TAddToFavorites['payload']) => {
    try {
      setAddLoading(true)
      setInFavorites(!inFavorites)
      const response = await FavoritesService.addToFavorites(data)

      dispatch(
        favoritesActions.setState({ favorites: [...favorites, response.data] }),
      )
    } catch (err) {
      console.error('onAddFavorite err=>', err.response.data)
    } finally {
      setAddLoading(false)
    }
  }

  const onAddFavorite = (data: TAddToFavorites['payload']) => {
    _onAddFavorite(data)
  }

  const onDeleteFavorite = async (id: string) => {
    try {
      setAddLoading(true)

      setInFavorites(!inFavorites)

      const { data: deleted } = await FavoritesService.getSearchById({ id })

      if (!deleted) return

      await FavoritesService.deleteFromFavorites(deleted._id)

      dispatch(
        favoritesActions.setState({
          favorites: favorites.filter(item => item._id !== deleted._id),
        }),
      )
    } catch (err) {
      console.error('onDeleteFavorite err=>', err)
    } finally {
      setAddLoading(false)
    }
  }

  useEffect(() => {
    !disableCheck && onCheck()
  }, [id])

  return {
    addLoading,
    onDeleteFavorite,
    onAddFavorite,
    loading,
    inFavorites,
  }
}
