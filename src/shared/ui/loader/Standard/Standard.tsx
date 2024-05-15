import React from 'react'
import { ActivityIndicatorProps } from 'react-native'
import { Indicator } from './styled'
import { TMargin } from '../../utils'
import { EColors } from '../../Styled'

type StandardProps = Partial<ActivityIndicatorProps> & TMargin

export const Standard = (props: StandardProps) => {
  return (
    <>
      <Indicator color={EColors.primary} size="small" {...props} />
    </>
  )
}
