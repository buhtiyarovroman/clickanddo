import React, { useEffect, useRef, useState } from 'react'
import i18next from 'i18next'
import { RouteProp, useIsFocused, useRoute } from '@react-navigation/native'

import { EScreens, THomeStack } from '@/app/navigation'
import { Header } from '@/widgets/header'
import { SpecialistsList } from '@/widgets/SpecialistsList'
import { BottomSheet } from '@/widgets/bottomSheet'
import { useGetInterests } from '@/features/Interests/hooks'
import { Background } from '@/shared/ui/background'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { CategoryWidgets } from '@/widgets/Category'

export const Specialists = () => {
  const isFocused = useIsFocused()
  const route = useRoute<RouteProp<THomeStack, EScreens.HomeSpecialists>>()
  const [selectedInterest, setSelectedInterest] = useState<string[]>([])

  const currentTitle =
    route.params?.title?.find(el => el.lang === i18next.language)?.value || ''

  const category = route.params.category

  const {
    getFirstPage,
    getMore: getMoreInterests,
    canGetMoreItems,
    loading,
    interests,
  } = useGetInterests({
    category: route.params?.category,
  })

  const ref = useRef<TBottomSheetBaseRef | null>(null)

  const openFilters = () => {
    ref.current?.open()
  }

  const onGetMoreInterests = () => {
    if (!canGetMoreItems) return

    getMoreInterests()
  }

  useEffect(() => {
    isFocused && getFirstPage()
  }, [isFocused])

  const onSelectInterest = (id: string) => {
    if (selectedInterest.includes(id)) {
      setSelectedInterest(selectedInterest.filter(item => item !== id))
      return
    }
    setSelectedInterest(prev => [...prev, id])
  }

  return (
    <>
      <Header.CenterTitle goBack title={currentTitle} />
      <Background.Standard pHorizontal={20}>
        <CategoryWidgets.Scroll
          loading={loading}
          setSelectedInterest={onSelectInterest}
          onEndReached={onGetMoreInterests}
          openFilters={openFilters}
          interests={interests}
          selectedInterest={selectedInterest}
          canGetMoreItems={!!canGetMoreItems}
        />

        <SpecialistsList
          selectedInterest={selectedInterest}
          category={category}
        />
      </Background.Standard>

      <BottomSheet.SpecialistsFilters
        currentCategory={currentTitle}
        ref={ref}
      />
    </>
  )
}
