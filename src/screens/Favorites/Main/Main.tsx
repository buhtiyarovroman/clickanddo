import React from 'react'

import { Header } from '@/widgets/header'
import { FavoritesWidgets } from '@/widgets/Favorites'
import { Background } from '@/shared/ui/background'

export const Main = () => (
  <>
    <Header.Home />
    <Background.Standard pHorizontal={20}>
      <FavoritesWidgets.List />
    </Background.Standard>
  </>
)
