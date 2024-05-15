import React, { useState, forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from 'react-native'
import { Button } from '../../button'
import { FlexWrapper, LMedium } from '../../Styled/Styled'
import { StyledModalContainer, ModalContainer } from './styled'
import { TStandardModalProps, TStandardModalRef } from './types'

export const AcceptModal = forwardRef<TStandardModalRef, TStandardModalProps>(
  (
    { onPressAgree = () => {}, onPressDisagree = () => {}, title = '' },
    ref,
  ) => {
    const { t } = useTranslation()
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

    const _onPressDisagree = () => {
      onClose()
      onPressDisagree()
    }

    const _onPressAgree = () => {
      onClose()

      onPressAgree()
    }

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <StyledModalContainer onPress={onClose}>
          <ModalContainer>
            <LMedium mBottom={'20px'}>{title}</LMedium>
            <FlexWrapper>
              <Button.Standard
                width={'47%'}
                text={t('yes')}
                mRight={'16px'}
                onPress={_onPressAgree}
              />
              <Button.Standard
                width={'47%'}
                text={t('no')}
                onPress={_onPressDisagree}
              />
            </FlexWrapper>
          </ModalContainer>
        </StyledModalContainer>
      </Modal>
    )
  },
)
