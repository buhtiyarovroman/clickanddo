import React from 'react'
import { View, StyleSheet } from 'react-native'

import { EColors } from '@/shared/ui/Styled'
import { TUserSpecialistInformationProps } from './types'
import { UserSpecialistFeatures } from '../../..'
import { Hr } from '@/shared/ui/Styled/Styled'

export const Information = ({ user }: TUserSpecialistInformationProps) => (
  <View style={styles.wrapper}>
    <UserSpecialistFeatures.Skills hashtag={user?.hashtag} />

    <Hr mTop={'10px'} mBottom={'10px'} color={EColors.grey_300} />

    <UserSpecialistFeatures.AdditionalInformation {...user} />
  </View>
)

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
})
