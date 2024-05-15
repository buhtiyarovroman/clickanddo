import { useMemo } from 'react'
import { useTypedSelector } from '@/app/store'
import { ETabStacks } from '@/app/navigation/tabs/Main'

import { getUserSelector } from '@/entities/User'
import { KeysOfEStacks, TUseTabs } from './types'

export const useTabs = () => {
  const { user } = useTypedSelector(getUserSelector)
  const isSpecialist = user?.role === 'specialist'

  const currentCenterIcons: TUseTabs = useMemo(() => {
    if (isSpecialist) {
      return {
        Icon: 'TabJobSpeciaList',
        ActiveIcon: 'TabJobSpeciaListActive',
      }
    }

    return {
      Icon: 'TabList',
      ActiveIcon: 'TabListActive',
    }
  }, [isSpecialist])

  const currentLeftIcons: TUseTabs = useMemo(() => {
    if (isSpecialist) {
      return {
        Icon: 'TabLeftSpeciaList',
        ActiveIcon: 'TabLeftSpeciaListActive',
      }
    }

    return {
      Icon: 'TabHome',
      ActiveIcon: 'TabHomeActive',
    }
  }, [isSpecialist])

  const tabs: Record<KeysOfEStacks, TUseTabs> = {
    [ETabStacks.List]: currentLeftIcons,
    [ETabStacks.Projects]: {
      Icon: 'TabOrder',
      ActiveIcon: 'TabOrderActive',
    },
    [ETabStacks.Home]: currentCenterIcons,
    [ETabStacks.Favorites]: {
      Icon: 'TabFavorite',
      ActiveIcon: 'TabFavoriteActive',
    },
    [ETabStacks.Chat]: {
      Icon: 'TabChat',
      ActiveIcon: 'TabChatActive',
    },
  }

  return { tabs }
}
