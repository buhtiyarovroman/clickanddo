import React, { useEffect } from 'react'

import { useIsFocused } from '@react-navigation/native'

import { useTypedSelector } from '@/app/store'

import { Header } from '@/widgets/header'
import { ListWidgets } from '@/widgets/List'

import { useGetPublicationWithPagination } from '@/features/Publication'

import { getUserSelector } from '@/entities/User'

import { Background } from '@/shared/ui/background'

import { getPublicationSelector } from '@/entities/Publication'

export const Main = () => {
  const { user } = useTypedSelector(getUserSelector)
  const { listFilters } = useTypedSelector(getPublicationSelector)

  const isFocused = useIsFocused()

  const { getFirstPage } = useGetPublicationWithPagination({
    limit: 10,
  })

  const isSpecialist = user?.role === 'specialist'

  useEffect(() => {
    getFirstPage()
  }, [isFocused])

  return (
    <Background.SafeArea>
      <Header.Home title={listFilters.address} titleIcon={'LocationPoint'} />
      {isSpecialist && (
        <Background.Standard pHorizontal={20}>
          <ListWidgets.SpecialistList />
        </Background.Standard>
      )}
      {!isSpecialist && (
        <Background.Standard>
          <ListWidgets.CustomerList />
        </Background.Standard>
      )}
    </Background.SafeArea>
  )
}
