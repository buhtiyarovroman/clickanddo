import React from 'react'
import { FlatList } from 'react-native'

import { TWidgetUserSpecialistGuest } from './types'
import { Header } from './ui'
import { v4 as uuidv4 } from 'uuid'
import { SpecialistGuestTabs } from '@/features/User/Specialist/SpecialistGuestTabs'

export const SpecialistGuest = ({
  isEdit = false,
  user,
}: TWidgetUserSpecialistGuest) => (
  <FlatList
    keyExtractor={() => uuidv4()}
    showsVerticalScrollIndicator={false}
    scrollEnabled={true}
    nestedScrollEnabled
    data={[1]}
    ListHeaderComponent={<Header user={user} {...{ isEdit }} />}
    stickyHeaderIndices={[1]}
    renderItem={() => <SpecialistGuestTabs {...{ isEdit, user }} />}
  />
)
