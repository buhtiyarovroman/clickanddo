import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

type TUseStorePagination = {
  // TODO: Add correct types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAction: any
  limit: number
  loading: boolean
  items: Array<unknown>
  totalCount: number
  filterParams?: Object
  canGetMore?: boolean
  // TODO: Add correct types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearAction?: any
}

export const useStorePagination = ({
  getAction,
  limit,
  loading,
  items = [],
  totalCount,
  filterParams = undefined,
  canGetMore = true,
  clearAction,
}: TUseStorePagination) => {
  const dispatch = useDispatch()
  const isFocus = useIsFocused()

  const [filter, setFilter] = useState<Object | undefined>(filterParams)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const length = useMemo(() => items.length ?? 0, [items.length])

  const [refreshing, setRefresing] = useState(false)

  const canGetMoreItems = useMemo(
    () => items.length < totalCount && items.length && canGetMore,
    [canGetMore, items.length, totalCount],
  )

  const loadMoreLoading = useMemo(
    () => (canGetMoreItems || loading) && !refreshing,
    [canGetMoreItems, loading, refreshing],
  )

  // Get more method
  const getMore = useCallback(() => {
    if (!loading && canGetMoreItems) {
      dispatch(
        getAction({
          limit,
          skip: length,
          ...(filter ? filter : {}),
        }),
      )
    }
  }, [canGetMoreItems, dispatch, filter, getAction, length, limit, loading])

  // Get first page
  const getFirstPage = useCallback(() => {
    dispatch(getAction({ limit, ...(filter ? filter : {}) }))
  }, [dispatch, filter, getAction, limit])

  // Refresh
  const refresh = useCallback(() => {
    setRefresing(true)
    getFirstPage()
  }, [getFirstPage])

  // Clear store when screen is innactive
  useEffect(() => {
    if (!isFocus) {
      clearAction && dispatch(clearAction())
      setIsFirstLoad(true)
    }
  }, [clearAction, dispatch, isFocus])

  // Effect for listen end of loading
  useEffect(() => {
    if (!loading) setRefresing(false)
  }, [loading])

  // Effect for set filter params to state
  useEffect(() => {
    !_.isEqual(filterParams, filter) && setFilter(filterParams)
  }, [filter, filterParams])

  // Focus effect for getting first page iteаms
  useFocusEffect(
    useCallback(() => {
      getFirstPage()
    }, [getFirstPage]),
  )

  useEffect(() => {
    if (!items.length) {
      setIsFirstLoad(true)
    }
  }, [items])
  return {
    getMore,
    getFirstPage,
    isFirstLoad: isFirstLoad && !refreshing,
    setIsFirstLoad,
    canGetMoreItems,
    loadMoreLoading,
    refreshing,
    refresh,
  }
}
