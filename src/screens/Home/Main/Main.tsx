import React, { useEffect } from 'react'
import { useTypedSelector } from '@/app/store'
import { Header } from '@/widgets/header'
import { CategoryWidgets } from '@/widgets/Category'
import { ProjectsWidgets } from '@/widgets/Projects'
import { getUserSelector } from '@/entities/User'
import { Background } from '@/shared/ui/background'
import { styles } from './styled'

import { useGetFavorites } from '@/features/Favorites'
import { useGetMyPosition } from '@/features/hooks'

export const Main = () => {
  const { user } = useTypedSelector(getUserSelector)
  const { getFirstPage } = useGetFavorites({ limit: 10 })
  const { getCurrentLocation } = useGetMyPosition({})

  const isCustomer = user?.role === 'customer'

  useEffect(() => {
    getFirstPage()
    getCurrentLocation()
  }, [])

  return (
    <>
      <Header.Home />

      <Background.Standard style={styles.main} pHorizontal={20}>
        {/* Category list */}
        {isCustomer && <CategoryWidgets.List />}
        {!isCustomer && <ProjectsWidgets.ProjectList />}
      </Background.Standard>
    </>
  )
}
