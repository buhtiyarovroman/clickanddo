import React from 'react'
import { StyleSheet } from 'react-native'
import { Header } from '..'

import { useNavigation } from '@/features/hooks'
import { FlexWrapper, H3 } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { TStandardProps } from '../Standard/types'
import { IconContainer } from './styled'

export const CenterTitle = ({
  title = '',
  goBack,
  leftIcon,
  leftIconProps = {},
  rightIcon,
  rightIconProps = {},
  onPressRightIcon = () => {},
  onPressLeftIcon = () => {},
  onGoBack,
  disableShadow = false,
}: TStandardProps) => {
  const navigation = useNavigation()

  const _onGoBack = () => {
    if (onGoBack) {
      onGoBack()

      return
    }

    navigation.goBack()
  }
  return (
    <>
      <Header.Container activeShadow={!disableShadow}>
        <FlexWrapper
          height={'100%'}
          style={styles.main}
          width={'100%'}
          justify={'center'}>
          {/* Go back button */}
          {leftIcon && !goBack && (
            <IconContainer onPress={onPressLeftIcon}>
              <Icon name={leftIcon} size={18} {...leftIconProps} />
            </IconContainer>
          )}

          {goBack && (
            <IconContainer onPress={_onGoBack}>
              <Icon name={'Back'} size={18} />
            </IconContainer>
          )}

          {/* Title */}
          <H3 numberOfLines={1} align="center" style={styles.title}>
            {title}
          </H3>

          {/* Icon */}
          {rightIcon && (
            <IconContainer isRight onPress={onPressRightIcon}>
              <Icon name={rightIcon} {...rightIconProps} />
            </IconContainer>
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
    padding: 5,
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  title: {
    width: '70%',
  },
})
