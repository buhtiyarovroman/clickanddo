import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { EScreens } from '@/app/navigation'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useNavigation } from '@/features/hooks'
import { useGetCategories } from '@/features/Categories'
import { getTranslate } from '@/shared/utils'
import { Loader } from '@/shared/ui/loader'
import { TCategory } from '@/entities/Category/models'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import {
  FlexWrapper,
  SRegular,
  LSemibold,
  H3SemiBold,
} from '@/shared/ui/Styled/Styled'
import { TSpecialistsFiltersBottomSheetProps } from './types'
import { Container, styles } from './styles'
import { Rating } from './ui'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const SpecialistsFilters = forwardRef<
  TBottomSheetBaseRef,
  TSpecialistsFiltersBottomSheetProps
>(({ currentCategory }, ref) => {
  const [open, setOpen] = useState(false)
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const {
    categories,
    getFirstPage,
    getMore,
    canGetMoreItems,
    loadMoreLoading,
  } = useGetCategories()

  const renderLoader = useCallback(
    () => (loadMoreLoading ? <Loader.Standard size={30} /> : <></>),
    [loadMoreLoading],
  )

  const renderItem = ({ item }: { item: TCategory }) => {
    const onItemPress = () => {
      navigate(EScreens.HomeSpecialists, {
        category: item._id,
        title: item.title,
      })
      ref?.current?.close()
    }
    return (
      <TouchableOpacity onPress={onItemPress} style={styles.categoryItem}>
        <LSemibold>{getTranslate(item.title)}</LSemibold>
      </TouchableOpacity>
    )
  }

  const onGetMoreCategories = () => {
    if (!loadMoreLoading && canGetMoreItems) {
      getMore()
    }
  }
  const openDropdown = () => setOpen(prev => !prev)
  useEffect(() => {
    getFirstPage()
  }, [])

  return (
    <BottomSheet.Base borderRadius={35} snapPoints={['50%']} ref={ref}>
      <Container>
        <H3SemiBold>{t('filter_results')}</H3SemiBold>
        <TouchableOpacity
          onPress={openDropdown}
          style={styles.textWrapper}
          activeOpacity={0.7}>
          <FlexWrapper
            flexDirection="column"
            justify="center"
            align="flex-start">
            <SRegular mBottom="4px">{t('category')}</SRegular>
            <LSemibold>{currentCategory}</LSemibold>
          </FlexWrapper>
          <View style={{ transform: [{ rotate: open ? '90deg' : '0deg' }] }}>
            <Icon
              name="AngleArrowRight"
              size={30}
              fill={EColors.grey_600}
              stroke={EColors.grey_600}
            />
          </View>
        </TouchableOpacity>
        {open && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.dropdown}
            data={categories}
            onEndReached={onGetMoreCategories}
            ListFooterComponent={renderLoader}
            renderItem={renderItem}
            nestedScrollEnabled
          />
        )}
        <Rating />
        <View style={{ height: TAB_HEIGHT }} />
      </Container>
    </BottomSheet.Base>
  )
})
