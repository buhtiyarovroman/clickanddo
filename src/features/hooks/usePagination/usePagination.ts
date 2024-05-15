import { useCallback, useEffect, useMemo, useState } from 'react'

export type TPaginationGetAction = (
  skip: number,
  activeGlobalLoader?: boolean,
) => Promise<void>

type TUsePagination = {
  getAction: TPaginationGetAction
  loading: boolean
  items: Array<unknown>
  totalCount: number
}
/**
 *
 *@prop @param getAction - function that implemente get logic. Please use memoization for that component
 *
 */
export const usePagination = ({
  getAction,
  loading,
  items = [],
  totalCount,
}: TUsePagination) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const length = useMemo(() => items.length ?? 0, [items.length])

  const [refreshing, setRefresing] = useState(false)

  const canGetMoreItems = useMemo(
    () => items.length < totalCount && items.length,
    [items.length, totalCount],
  )

  const loadMoreLoading = useMemo(
    () => (canGetMoreItems || loading) && !refreshing,
    [canGetMoreItems, loading, refreshing],
  )

  // Get more method
  const getMore = useCallback(() => {
    if (loading || !canGetMoreItems) return
    getAction(length)
  }, [loading, canGetMoreItems, getAction, length])

  // Get first page
  const getFirstPage = useCallback(
    (activeGlobalLoader?: boolean) => {
      getAction(0, activeGlobalLoader).finally(() => setIsFirstLoad(false))
    },
    [getAction],
  )

  // Refresh
  const refresh = useCallback(() => {
    setRefresing(true)
    getFirstPage()
  }, [getFirstPage])

  // Effect for listen end of loading
  useEffect(() => {
    if (!loading) setRefresing(false)
  }, [loading])

  // Get first page
  // useEffect(() => {
  //   console.log('work useEffect')

  //   getFirstPage()
  // }, [getFirstPage, i18n.language])

  useEffect(() => {
    if (items.length) return
    setIsFirstLoad(true)
  }, [items])

  return {
    getMore,
    getFirstPage,
    isFirstLoad: isFirstLoad && !refreshing,
    canGetMoreItems,
    loadMoreLoading,
    refreshing,
    refresh,
  }
}
