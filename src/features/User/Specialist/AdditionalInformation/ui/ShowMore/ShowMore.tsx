import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { TAddInfoShowMoreProps } from './types'

export const ShowMore = ({ name = '', times = '' }: TAddInfoShowMoreProps) => {
  return (
    <FlexWrapper mBottom={'10px'} justify={'space-between'}>
      <MRegular numberOfLines={1} style={styles.text} color={EColors.grey_900}>
        {name}
      </MRegular>

      {times && <MRegular color={EColors.grey_600}>{times}</MRegular>}
    </FlexWrapper>
  )
}

const styles = StyleSheet.create({
  text: {
    maxWidth: '60%',
  },
})
