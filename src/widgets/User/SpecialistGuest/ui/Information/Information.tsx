import React from 'react'
import { StyleSheet } from 'react-native'

import { EColors } from '@/shared/ui/Styled'
import { TUserSpecialistInformationProps } from './types'
import { UserSpecialistFeatures } from '../../../../../features/User/Specialist'
import { Hr } from '@/shared/ui/Styled/Styled'
import { ScrollView } from 'react-native-collapsible-tab-view'

export const Information = ({ user }: TUserSpecialistInformationProps) => (
  <ScrollView style={styles.wrapper}>
    <UserSpecialistFeatures.Skills hashtag={user?.hashtag} />

    <Hr mTop={'10px'} mBottom={'10px'} color={EColors.grey_300} />

    <UserSpecialistFeatures.AdditionalInformation {...user} />
  </ScrollView>
)

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
})
