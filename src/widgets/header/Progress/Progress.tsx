import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '..'
import { TProgressHeaderProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { PageIndicator } from '@/shared/ui/PageIndicator'
import { EColors } from '@/shared/ui/Styled'
import { IconContainer } from './styled'

export const Progress = ({
  title = '',
  withGoBack = true,
  onGoBack,
  activeTextProgress = false,
  hideProgress = false,
  isClose = false,
  onPressClose = () => {},
  ...props
}: TProgressHeaderProps) => {
  const navigation = useNavigation()

  const _onGoBack = () => {
    if (onGoBack) {
      onGoBack()

      return
    }
    navigation.goBack()
  }

  const _onPressClose = () => {
    onPressClose()
  }
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
              <IconContainer onPress={_onGoBack}>
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
