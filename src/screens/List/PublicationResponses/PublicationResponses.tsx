import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useRoute } from '@react-navigation/native'

import { EScreens, TListStack } from '@/app/navigation'
import { Header } from '@/widgets/header'

import { ListFeatures } from '@/features/List'
import { Background } from '@/shared/ui/background'
import { usePublicationResponses } from '@/features/Publication'
import { FlatList, ListRenderItem } from 'react-native'
import { TProject } from '@/entities/Projects/models'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { TPublicationStack } from '@/app/navigation/stacks/Publication'

export const PublicationResponses = () => {
  const { t } = useTranslation()

  const { id, projects, type } =
    useRoute<RouteProp<TPublicationStack, EScreens.PublicationResponses>>()
      .params

  const [createdProjects, setCreatedProjects] = useState(projects || 0)

  const disabled = type === 'special-offer' ? createdProjects >= 1 : false

  const { responses, getFirstPage, getMore, canGetMoreItems, refresh } =
    usePublicationResponses({
      id,
    })

  useEffect(() => {
    getFirstPage()
  }, [])

  const renderItem: ListRenderItem<TProject> = ({ item }) => {
    return (
      <ListFeatures.ResponsesCard
        disableButtons={disabled}
        mBottom={'20px'}
        onRefresh={refresh}
        onAddCount={setCreatedProjects}
        {...item}
      />
    )
  }

  const onGetMore = () => {
    if (canGetMoreItems) getMore
  }

  return (
    <>
      <Header.CenterTitle disableShadow goBack title={t('responses')} />

      <Background.Standard pHorizontal={20}>
        <FlatList
          data={responses}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          contentContainerStyle={{ paddingBottom: TAB_HEIGHT }}
          onEndReached={onGetMore}
        />
      </Background.Standard>
    </>
  )
}
