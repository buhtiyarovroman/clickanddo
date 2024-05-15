import { UserEntities } from '@/entities/User'
import { EColors } from '@/shared/ui/Styled'
import { MRegular } from '@/shared/ui/Styled/Styled'
import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export const Completed = memo(() => {
  return (
    <View style={styles.main}>
      <UserEntities.ReviewCard />

      <TouchableOpacity style={styles.touch}>
        <MRegular color={EColors.primary}>More</MRegular>
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  main: {
    paddingVertical: 24,
  },
  touch: {
    marginTop: 16,
  },
})
