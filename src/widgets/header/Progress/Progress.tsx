import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, BackHandler } from 'react-native'
import { Header } from '..'
import { TProgressHeaderProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { PageIndicator } from '@/shared/ui/PageIndicator'
import { EColors } from '@/shared/ui/Styled'
import { IconContainer } from './styled'
import { Modal } from '@/shared/ui/modals'
import { TModalViewRef } from '@/shared/ui/modals/ViewModal'
import { useTranslation } from 'react-i18next'

export const Progress = ({
  title = '',
  withGoBack = true,
  onGoBack,
  activeTextProgress = false,
  hideProgress = false,
  isClose = false,
  onPressClose = () => {},
  needBackHandler = false,
  ...props
}: TProgressHeaderProps) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const ref = useRef<TModalViewRef>(null)

  const _onGoBack = () => {
    if (onGoBack) {
      onGoBack()

      return
    }

    navigation.goBack()
  }

  const onPressIcon = () => {
    if (needBackHandler) {
      ref.current?.open()
      return
    }

    _onGoBack()
  }

  const onClose = () => {
    ref.current?.close()
  }

  const _onPressClose = () => {
    onPressClose()
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (needBackHandler) {
          ref.current?.open()
        } else {
          navigation.goBack()
        }

        return true
      },
    )

    return () => backHandler.remove()
  }, [])

  return (
    <>
      <Header.Container addHeight={hideProgress ? 0 : 30}>
        <FlexWrapper
          height={'100%'}
          style={styles.main}
          flexDirection={'column'}>
          <FlexWrapper mBottom={'16px'} width={'100%'} justify={'center'}>
            {/* Go back button */}
            {withGoBack && (
              <IconContainer onPress={onPressIcon}>
                <Icon name={'Back'} size={18} />
              </IconContainer>
            )}

            {/* Title */}
            <LSemibold>{title}</LSemibold>

            {isClose && (
              <IconContainer isRight onPress={_onPressClose}>
                <Icon name={'Close'} stroke={EColors.black} size={18} />
              </IconContainer>
            )}
            {!isClose && <View />}
          </FlexWrapper>

          {!hideProgress && (
            <PageIndicator {...props} activeText={activeTextProgress} />
          )}
        </FlexWrapper>
      </Header.Container>

      <Modal.AcceptModal
        title={t('modal_go_back')}
        ref={ref}
        onPressAgree={_onGoBack}
        onPressDisagree={onClose}
      />
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
  },
  touch: {
    position: 'absolute',
    left: 0,
    padding: 5,
  },
})
