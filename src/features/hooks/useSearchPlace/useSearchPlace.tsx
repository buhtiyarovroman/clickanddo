import { useEffect, useState } from 'react'
import _ from 'lodash'

import { TPredictionPlace } from '@/entities/User/models'
import { UserService } from '@/entities/User/services'

export const useSearchPlace = () => {
  const [search, setSearch] = useState('')
  const [places, setPlaces] = useState<TPredictionPlace[]>([])

  const getPlaces = async () => {
    try {
      const { data } = await UserService.getGoogleCity({
        input: search,
      })
      setPlaces(data.predictions)
    } catch (err) {
      console.log('useFindHashTags error:', err)
    } finally {
    }
  }

  const debouncedFetchHashtags = _.debounce(getPlaces, 800)

  useEffect(() => {
    if (search.length > 2) {
      debouncedFetchHashtags()
    }
    if (search.length === 0) {
      setPlaces([])
    }
    return () => debouncedFetchHashtags.cancel()
  }, [search])

  return {
    places,
    search,
    setSearch,
    getPlaces,
  }
}
