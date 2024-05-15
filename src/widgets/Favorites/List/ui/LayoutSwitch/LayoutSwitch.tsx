import React from 'react'

import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { TLayoutSwitchProps } from './types'
import { Container } from './styles'

export const LayoutSwitch = ({
  isGridLayout,
  setValue,
}: TLayoutSwitchProps) => {
  const toggleValue = () => {
    setValue(prev => !prev)
  }
  return (
    <Container>
      <Button.Standard
        opacity={0.8}
        onPress={!isGridLayout ? toggleValue : () => {}}
        style={{
          backgroundColor: isGridLayout ? EColors.white : EColors.grey_200,
        }}
        iconProps={{
          fill: isGridLayout ? EColors.grey_800 : EColors.grey_400,
          size: 16,
        }}
        icon="Grid"
        width="35px"
        height="35px"
      />
      <Button.Standard
        opacity={0.8}
        onPress={isGridLayout ? toggleValue : () => {}}
        icon="List"
        style={{
          backgroundColor: !isGridLayout ? EColors.white : EColors.grey_200,
        }}
        iconProps={{
          fill: !isGridLayout ? EColors.grey_800 : EColors.grey_400,
          size: 16,
        }}
        width="35px"
        height="35px"
      />
    </Container>
  )
}
