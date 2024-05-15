import React from 'react'
import { TProjectResponsesListProps } from './types'

import { FlatList, ListRenderItem } from 'react-native'
import { TProjectResponse } from '@/entities/Projects/models'
import { ResponseCard } from '@/entities/Projects/ResponseCard'
import { ContentContainer } from './styled'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'

export const Responses = ({
  projectResponses = [],
  _id = '',
  onRefresh = () => {},
  specialist,
}: TProjectResponsesListProps) => {
  const { user } = useTypedSelector(getUserSelector)
  const { navigate } = useNavigation()
  const isCustomer = user?.role === 'customer'

  const onNavigateUser = (id: string) => {
    navigate(EScreens.JobProfile, { id })
  }
  const renderItem: ListRenderItem<TProjectResponse> = ({ item, index }) => {
    const firstMargin = index === 0 ? '20px' : '0px'
    const isSpecialist = !!specialist

    return (
      <ResponseCard
        projectId={_id}
        mBottom={'20px'}
        mTop={firstMargin}
        isCustomer={isCustomer}
        onRefresh={onRefresh}
        disableButton={isSpecialist}
        onPressUser={() => onNavigateUser(item.specialist)}
        {...item}
      />
    )
  }

  return (
    <ContentContainer>
      <FlatList
        keyExtractor={item => item._id}
        data={projectResponses}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </ContentContainer>
  )
}
