import React, { useState } from 'react'
import { LayoutChangeEvent } from 'react-native'
import { TPageIndicator } from './types'
import { FlexWrapper, SRegular } from '../Styled/Styled'
import { Indicator, Progress } from './styled'
import { EColors } from '../Styled'

export const PageIndicator = ({
  count = 1,
  page = 1,
  activeText = false,
  ...props
}: TPageIndicator) => {
  const [containerWidth, setContainerWidth] = useState(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  const currentWidth = activeText ? '85%' : '100%'

  return (
    <>
      <FlexWrapper {...props} justify={'space-between'}>
        <FlexWrapper
          width={currentWidth}
          onLayout={handleLayout}
          justify={'space-between'}>
          <Progress>
            <Indicator count={count} width={containerWidth} page={page} />
          </Progress>
        </FlexWrapper>

        {activeText && (
          <SRegular color={EColors.grey_500}>
            {page} of {count}
          </SRegular>
        )}
      </FlexWrapper>
    </>
  )
}
