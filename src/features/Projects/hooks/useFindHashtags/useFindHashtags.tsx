import { useContext, useEffect, useState } from 'react'
import _ from 'lodash'

import { THashTag } from '@/entities/User/models'
import { UserService } from '@/entities/User/services'
import i18next from 'i18next'
import { LoaderContext } from '@/app/contexts/Loader'
import Toast from 'react-native-toast-message'

export const useFindHashtags = () => {
  const [search, setSearch] = useState('')
  const [foundHashTags, setFoundHashtags] = useState<THashTag[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const { setLoading: setGlobalLoading } = useContext(LoaderContext)

  const fetchHashtags = async () => {
    try {
      setLoading(true)
      const { data } = await UserService.getHashtag({
        title: search,
        limit: 10,
        skip: 0,
        status: 'approved',
      })
      setFoundHashtags(data.docs)
    } catch (err) {
      console.log('useFindHashTags error:', err)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchHashtags = _.debounce(fetchHashtags, 800)

  useEffect(() => {
    if (search.length > 2) {
      debouncedFetchHashtags()
    }
    if (search.length === 0) {
      fetchHashtags()
    }
    return () => debouncedFetchHashtags.cancel()
  }, [search])

  const onAddHashTag = async () => {
    try {
      setGlobalLoading(true)
      await UserService.postHashtag({
        title: [{ lang: i18next.language, value: search }],
      })

      fetchHashtags()

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

  return {
    foundHashTags,
    loading,
    search,
    setSearch,
    onAddHashTag,
    fetchHashtags,
  }
}
