import React, { useCallback, useEffect } from 'react'
import { View, FlatList } from 'react-native'

import { TUser } from '@/entities/User/models'

import { Loader } from '@/shared/ui/loader'

import { styles } from './styles'
import { TSpecialistsListProps } from './types'
import { useGetSpecialists } from '@/features/specialists'
import { TAB_HEIGHT } from '../BottomTab/useAnimatedTab'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { SpecialistEntities } from '@/entities/Specialist'

export const SpecialistsList = ({
  selectedInterest = [],
  category,
}: TSpecialistsListProps) => {
  const { navigate } = useNavigation()

  const {
    data: specialists,
    getFirstPage,
    loadMoreLoading,
    canGetMoreItems,
    getMore,
  } = useGetSpecialists({
    category: [category],
    interest: selectedInterest,
  })

  useEffect(() => {
    getFirstPage()
  }, [selectedInterest])

  const renderSeparator = () => <View style={styles.separator} />

  const renderFooter = useCallback(() => {
    if (loadMoreLoading && canGetMoreItems) {
      return <Loader.Standard mTop={'16px'} size={20} />
    }
    return null
  }, [loadMoreLoading, canGetMoreItems])

  const onGetMore = () => {
    if (canGetMoreItems) {
      getMore()
    }
  }

  const onGoSpecialistProfile = (id: string) => {
    navigate(EScreens.HomeJobStackScreen, {
      screen: EScreens.JobProfile,
      params: { id },
    })
  }

  const renderItem = ({ item }: { item: TUser }) => (
    <SpecialistEntities.SpecialistCard
      onPress={() => onGoSpecialistProfile(item._id)}
      item={item}
    />
  )

  return (
    <>
      <FlatList
        style={styles.listWrapper}
        showsVerticalScrollIndicator={false}
        data={specialists}
        ListFooterComponent={renderFooter}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: TAB_HEIGHT }}
        onEndReached={onGetMore}
      />
    </>
  )
}
