import { View, StyleSheet } from 'react-native'
import React from 'react'
import { UserSpecialistFeatures } from '@/features/User/Specialist'
import { TCustomerHeadProps } from './types'

export const Header = ({ user, isEdit = false }: TCustomerHeadProps) => (
  <View style={styles.header}>
    <UserSpecialistFeatures.UserInfo {...user} {...{ isEdit }} />
    <UserSpecialistFeatures.Description {...user} {...{ isEdit }} />
  </View>
)

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    paddingHorizontal: 20,
  },
})
