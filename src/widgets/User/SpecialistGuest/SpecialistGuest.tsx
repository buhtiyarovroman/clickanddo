import React, { useState } from 'react'

import { TWidgetUserSpecialistGuest } from './types'
import * as S from './styled'
import * as UI from './ui'

import { CollapsibleTabView } from '@/shared/ui/CollapsibleTabView'
import { TCollapsibleTabViewData } from '@/shared/ui/CollapsibleTabView/types'

import { useTranslation } from 'react-i18next'
import { ReviewsCollapsible } from '../Customer/ui'

export const SpecialistGuest = ({
  isEdit = false,
  user,
}: TWidgetUserSpecialistGuest) => {
  const [headerHeight, setHeaderHeight] = useState(0)

  const { t } = useTranslation()

  //Screen keys
  const homeTabBar: TCollapsibleTabViewData[] = [
    {
      key: 0,
      name: 'work',
      label: t('specialist_works'),
      Component: <UI.Works isEdit={isEdit} _id={user?._id} />,
    },

    {
      key: 1,
      name: 'information',
      label: t('specialist_information'),
      Component: <UI.Information {...{ isEdit, user }} />,
    },
    {
      key: 2,
      name: 'reviews',
      label: t('customer_reviews'),
      Component: <ReviewsCollapsible {...user} />,
    },
  ]

  const renderHeader = () => (
    <UI.Header {...{ isEdit, user }} getHeight={setHeaderHeight} />
  )

  return (
    <S.Container>
      <CollapsibleTabView
        headerHeight={headerHeight}
        data={homeTabBar}
        initialTabName={''}
        renderHeader={renderHeader}
      />
    </S.Container>
  )
}
