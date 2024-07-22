import { useContext, useEffect, useState } from 'react'
import _ from 'lodash'

import { THashTag } from '@/entities/User/models'
import { UserService } from '@/entities/User/services'
import i18next from 'i18next'
import { LoaderContext } from '@/app/contexts/Loader'
import Toast from 'react-native-toast-message'
import { usePagination } from '@/features/hooks'
import { transformHashtags } from '@/shared/config/transformHashtags'

export const useFindHashtags = () => {
  const [search, setSearch] = useState('')
  const [foundHashTags, setFoundHashtags] = useState<THashTag[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const { setLoading: setGlobalLoading } = useContext(LoaderContext)

  const fetchHashtags = async (skip: number) => {
    try {
      setLoading(true)

      const { data } = await UserService.getHashtag({
        title: search.toLocaleLowerCase(),
        limit: 20,
        skip,
        status: 'approved',
        lang: i18next.language,
      })

      const transform = transformHashtags(data.hits.hits)

      setFoundHashtags(prev =>
        skip === 0 ? transform : [...prev, ...transform],
      )

      setTotalCount(data.hits.total.value)
    } catch (err) {
      console.log('useFindHashTags error:', err)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchHashtags = _.debounce(fetchHashtags, 800)

  useEffect(() => {
    if (search.length > 2) {
      debouncedFetchHashtags(0)
    }
    if (search.length === 0) {
      fetchHashtags(0)
    }
    return () => debouncedFetchHashtags.cancel()
  }, [search])

  const onAddHashTag = async () => {
    try {
      setGlobalLoading(true)
      await UserService.postHashtag({
        title: [{ lang: i18next.language, value: search }],
      })

      fetchHashtags(0)

      setSearch('')

      Toast.show({
        type: 'success',
        text2: 'toasts.hashtag_added',
      })
    } catch (err) {
      console.log('onAddHashTag err =>', err)
    } finally {
      setGlobalLoading(false)
    }
  }

  const { ...paginationProps } = usePagination({
    getAction: fetchHashtags,
    items: foundHashTags,
    loading,
    totalCount,
  })

  return {
    foundHashTags,
    loading,
    search,
    setSearch,
    onAddHashTag,
    fetchHashtags,
    ...paginationProps,
  }
}
