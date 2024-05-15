import React, { useContext } from 'react'
import { TCustomDrawerProps } from './types'
import { DrawerContainer } from './styled'

import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SafeAreaContext } from '@/app/contexts'
import { Menu, UserSessionAccordion } from './components'
import { Hr } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'

export const CustomDrawer = ({}: TCustomDrawerProps) => {
  const { top, bottom } = useSafeAreaInsets()
  const { edges } = useContext(SafeAreaContext)

  const topPadding = !edges.includes('top') ? top / 2 : 0
  const bottomPadding = !edges.includes('bottom') ? bottom : 0

  return (
    <DrawerContainer top={topPadding} bottom={bottomPadding}>
      <UserSessionAccordion />
      <Hr color={EColors.grey_200} mTop={'12px'} mBottom={'12px'} />

      <Menu />
    </DrawerContainer>
  )
}
