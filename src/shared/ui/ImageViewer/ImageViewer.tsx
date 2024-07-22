import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FlexWrapper, MRegular } from '../Styled/Styled'
import { TImageViewProps, TImageViewRef } from './types'
import ImageView from 'react-native-image-viewing'
import { EColors } from '../Styled'

export const ImageViewer = forwardRef<TImageViewRef, TImageViewProps>(
  ({ data = [], index = 0, bottom = 10 }, ref) => {
    const [visible, setVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      show: () => {
        setVisible(true)
      },
      hide: () => {
        setVisible(false)
      },
    }))

    const renderFooter = (imageIndex: number) => (
      <FlexWrapper style={{ marginBottom: bottom }}>
        <MRegular color={EColors.white}>
          {imageIndex + 1}/{data.length}
        </MRegular>
      </FlexWrapper>
    )

    return (
      <ImageView
        images={data}
        imageIndex={index}
        backgroundColor={'#0000005e'}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        FooterComponent={({ imageIndex }) => renderFooter(imageIndex)}
      />
    )
  },
)
