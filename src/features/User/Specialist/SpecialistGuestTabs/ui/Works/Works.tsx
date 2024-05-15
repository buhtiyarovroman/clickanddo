import React from 'react'

import { TUserSpecialistWorksProps } from './types'
import { UserSpecialistFeatures } from '../../..'
import { Background } from '@/shared/ui/background'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

export const Works = ({ _id, isEdit = false }: TUserSpecialistWorksProps) => {
  const { bottom } = useSafeAreaInsets()
  // const [sort, setSort] = useState<TSortProps>({
  //   sortBy: 'createdAt',
  //   order: -1,
  //   type: EUserProjectsSortType.new_to_old,
  // })

  // useEffect(() => {
  //   getFirstPage()
  // }, [sort])

  return (
    <Background.Scroll
      nestedScrollEnabled
      contentContainerStyle={[
        { paddingBottom: TAB_HEIGHT + bottom + 32 },
        styles.main,
      ]}>
      {/* Publications */}
      <UserSpecialistFeatures.Publications {...{ isEdit, _id }} />

      {/* Special offers */}
      {/* <UserSpecialistFeatures.SpecialOffers {...{ isEdit, _id }} /> */}

      {/* Skillboxes */}
      {/* <UserSpecialistFeatures.SkillBox {...{ isEdit, _id }} /> */}
    </Background.Scroll>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
})
