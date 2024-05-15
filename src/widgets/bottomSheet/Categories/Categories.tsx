import React, { forwardRef, useCallback, useEffect } from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { H3SemiBold, LSemibold } from '@/shared/ui/Styled/Styled'

import { styles } from './styles'
import { TCategoriesBottomSheetProps } from './types'
import { useGetCategories } from '@/features/Categories'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { getTranslate } from '@/shared/utils'
import { Loader } from '@/shared/ui/loader'

export const Categories = forwardRef<
  TBottomSheetBaseRef,
  TCategoriesBottomSheetProps
>(({ setCategory }, ref) => {
  const { t } = useTranslation()
  const {
    categories,
    getMore,
    getFirstPage,
    canGetMoreItems,
    loadMoreLoading,
  } = useGetCategories()

  const renderLoader = useCallback(() => {
    return loadMoreLoading ? (
      <Loader.Standard mTop="10px" mBottom="10px" />
    ) : (
      <></>
    )
  }, [loadMoreLoading])

  const onEndReached = () => {
    canGetMoreItems && !loadMoreLoading && getMore()
  }
  useEffect(() => {
    getFirstPage()
  }, [])

  return (
    <BottomSheet.Base snapPoints={['68%']} ref={ref}>
      <View style={styles.container}>
        <H3SemiBold mBottom="20px">{t('select_category')}</H3SemiBold>
        <FlatList
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={categories}
          ListFooterComponent={renderLoader}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setCategory && setCategory(item)}
              activeOpacity={0.7}
              style={styles.item}>
              <LSemibold>{getTranslate(item.title)}</LSemibold>
            </TouchableOpacity>
          )}
        />
      </View>
    </BottomSheet.Base>
  )
})
