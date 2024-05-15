import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { Modal } from 'react-native'
import { StyledModalContainer } from './styled'
import { TStandardModalProps, TStandardModalRef } from './types'

export const Standard = forwardRef<TStandardModalRef, TStandardModalProps>(
  ({ children }, ref) => {
    const [visible, setVisible] = useState(false)

    const onClose = () => {
      setVisible(false)
    }

    useImperativeHandle(ref, () => ({
      open: () => {
        setVisible(true)
      },
      close: () => {
        setVisible(false)
      },
    }))

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <StyledModalContainer onPress={onClose}>
          {children}
        </StyledModalContainer>
      </Modal>
    )
  },
)
