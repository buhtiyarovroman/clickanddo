import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { TScrollProps } from './types'
import { keyboardAwareViewProps } from './config'
import { ScrollContainer, styles } from './styled'

export const Scroll = ({
  children,
  pHorizontal = 0,
  extraHeight = 150,
  keyboardShouldPersistTaps,
  ref,
  ...props
}: TScrollProps) => {
  console.log('ref =>', ref)
  return (
    <>
      <KeyboardAwareScrollView
        style={[styles.container]}
        extraScrollHeight={extraHeight}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        {...keyboardAwareViewProps}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        bounces={true}
        {...props}
        ref={ref}>
        <ScrollContainer pHorizontal={pHorizontal}>{children}</ScrollContainer>
      </KeyboardAwareScrollView>
    </>
  )
}
