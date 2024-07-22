import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { Platform } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { EColors } from '@/shared/ui/Styled'

import { ContentContainer } from './styled'
import { TBottomSheetBaseProps, TBottomSheetBaseRef } from './types'

export const Base = forwardRef<TBottomSheetBaseRef, TBottomSheetBaseProps>(
  (
    {
      children,
      snapPoints = ['50%'],
      backgroundColor,
      onClose,
      disableBackdrop = false,
      enableDynamicSizing = false,
      containerStyle = {},
      borderRadius = 12,
      isList,
      onBackdropPress = () => {},
    },
    ref,
  ) => {
    const bottomSheetRef = useRef<BottomSheetModal>(null)

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.present()
      },
      close: () => {
        bottomSheetRef.current?.dismiss()
      },
    }))

    const onBackdropClose = () => {
      bottomSheetRef.current?.dismiss()
      onBackdropPress()
    }

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onBackdropClose}
      />
    )

    const defaultBackground = EColors.white
    const indicatorStyle = {
      backgroundColor: EColors.grey_400,
      width: 68,
      height: 6,
    }

    const renderContent = () => {
      if (isList) return children

      return (
        <ContentContainer style={containerStyle}>{children}</ContentContainer>
      )
    }

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        backdropComponent={disableBackdrop ? undefined : renderBackdrop}
        onDismiss={onClose}
        handleIndicatorStyle={indicatorStyle}
        enableDynamicSizing={enableDynamicSizing}
        backgroundStyle={{
          backgroundColor: backgroundColor || defaultBackground,
          borderRadius: borderRadius || 12,
        }}
        enableContentPanningGesture={false}
        android_keyboardInputMode={'adjustResize'}
        // keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'fillParent'}
        keyboardBehavior={Platform.OS === 'ios' ? 'extend' : 'interactive'}
        keyboardBlurBehavior={Platform.OS === 'ios' ? 'none' : 'restore'}
        snapPoints={enableDynamicSizing ? [] : [...snapPoints]}>
        {renderContent()}
      </BottomSheetModal>
    )
  },
)
