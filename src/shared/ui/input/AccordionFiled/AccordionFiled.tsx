import React, { useState } from 'react'
import { Container } from './styled'
import { TAccordionFiledProps } from './types'

import { View } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const AccordionFiled = ({
  renderContent = () => <View />,
  renderHeader = () => <View />,
  width = '100%',
  active,
  ...props
}: TAccordionFiledProps) => {
  const [activeSections, setActiveSections] = useState<number[]>([])

  return (
    <Container width={width} {...props}>
      <Accordion
        activeSections={active ? [0] : activeSections}
        sections={['asfas']}
        renderHeader={(content, index, isActive) => renderHeader(isActive)}
        renderContent={renderContent}
        onChange={setActiveSections}
        touchableComponent={TouchableOpacity}
        touchableProps={{ activeOpacity: 0.8 }}
      />
    </Container>
  )
}
