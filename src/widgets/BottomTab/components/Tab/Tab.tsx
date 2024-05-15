import React from 'react'

import { TIconsKeys } from '@assets/Svg'

import { Icon } from '@/shared/ui/Icon'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'

import { Container, styles, CountContainer, CounterText } from './styled'

export type TTab = {
  active?: boolean
  // title: string
  icon: TIconsKeys
  activeIcon: TIconsKeys
  count?: number
}

export const Tab = ({ icon, active = false, activeIcon, count = 0 }: TTab) => {
  const CurrentIcon = active ? activeIcon : icon

  return (
    <Container>
      <FlexWrapper flexDirection={'column'} style={styles.main} width={'auto'}>
        {!!count && (
          <CountContainer>
            <CounterText>{count}</CounterText>
          </CountContainer>
        )}

        <Icon name={CurrentIcon} size={24} />
      </FlexWrapper>
    </Container>
  )
}
