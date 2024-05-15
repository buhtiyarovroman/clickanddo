import React, { forwardRef } from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { H3SemiBold } from '@/shared/ui/Styled/Styled'
import { TProjectMainFiltersProps } from './types'
import { InterestsFilters } from '@/features/Interests/InterestsFilters'
import { styles } from './styles'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const ProjectsMainFilters = forwardRef<
  TBottomSheetBaseRef,
  TProjectMainFiltersProps
>(({ setSelectedInterests = () => {}, selectedInterests = [] }, ref) => {
  const { t } = useTranslation()

  return (
    <BottomSheet.Base borderRadius={35} snapPoints={['75%']} ref={ref}>
      <View style={styles.container}>
        <H3SemiBold align="center">{t('filter_projects')}</H3SemiBold>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.interestsWrapper}>
            <InterestsFilters
              limit={10}
              interest={selectedInterests}
              onChange={setSelectedInterests}
            />
          </View>
          <View style={{ height: TAB_HEIGHT }} />
        </ScrollView>
      </View>
    </BottomSheet.Base>
  )
})
