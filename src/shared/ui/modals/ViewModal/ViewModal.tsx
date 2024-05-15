import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import ModalView from 'react-native-modal'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Container } from './styled'
import { TModalViewRef, TModalViewProps } from './types'

export const ViewModal = forwardRef<TModalViewRef, TModalViewProps>(
  ({ children, isVisible, setVisible, isBottom }, ref) => {
    const modalRef = useRef<ModalView>(null)

    useImperativeHandle(
      ref,
      () => ({
        open: () => {
          setVisible(true)
        },
        close: () => {
          setVisible(false)
        },
      }),
      [setVisible],
    )

    return (
      <ModalView
        ref={modalRef}
        isVisible={isVisible}
        swipeDirection={'down'}
        animationInTiming={500}
        animationIn={'fadeInUp'}
        animationOut={'fadeOutDown'}
        animationOutTiming={500}
        backdropOpacity={0.5}
        statusBarTranslucent={true}
        deviceHeight={hp(120)}
        onBackdropPress={() => setVisible(false)}
        onSwipeComplete={() => setVisible(false)}>
        <Container isBottom={isBottom}>{children}</Container>
      </ModalView>
    )
  },
)
