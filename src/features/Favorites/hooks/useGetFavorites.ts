import { favoritesActions } from './../../../entities/Favorites/store/actions'
import { useDispatch } from 'react-redux'
import { FavoritesEntities } from '@/entities/Favorites/index'
import { useCallback, useState } from 'react'
import { TUseGetFavoritesProps } from './types'
import { usePagination } from '@/features/hooks'
import { TFavorite } from '@/entities/Favorites/models'

const LIMIT = 4
export const useGetFavorites = ({ limit = LIMIT }: TUseGetFavoritesProps) => {
  const [favorites, setFavorites] = useState<TFavorite[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()

  const getActions = useCallback(
    async (nextSkip: number) => {
      try {
        setLoading(true)
        const { data } = await FavoritesEntities.FavoritesService.getFavorites({
          limit,
          skip: nextSkip,
        })

        setFavorites(prev =>
          nextSkip === 0 ? data.docs : [...prev, ...data.docs],
        )
        dispatch(
          favoritesActions.setState({
            favorites:
              nextSkip === 0 ? data.docs : [...favorites, ...data.docs],
          }),
        )

        setTotalCount(data.totalCount)
      } catch (err) {
        console.error('useGetPublication err =>', err)
      } finally {
        setLoading(false)
      }
    },
    [limit],
  )

  const { ...paginationProps } = usePagination({
    getAction: getActions,
    items: favorites,
    loading: loading,
    totalCount,
  })

  return {
    favorites,
    totalCount,
    page,
    setPage,
    loading,
    setFavorites,
    ...paginationProps,
  }
}
