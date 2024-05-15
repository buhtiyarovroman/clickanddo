import React from 'react'
import { View, StyleSheet } from 'react-native'

import { EColors } from '@/shared/ui/Styled'
import { MRegular } from '@/shared/ui/Styled/Styled'
import { TCustomerUserAboutProps } from './types'

export const About = ({ about = '' }: TCustomerUserAboutProps) => {
  return (
    <View style={styles.wrapper}>
      <MRegular>{about}</MRegular>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    padding: 16,
    backgroundColor: EColors.grey_200,
    borderRadius: 12,
    marginTop: 20,
  },
  header: {
    marginBottom: 8,
  },
})
