import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from '..'
import { TStandardProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, H3 } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { DrawerActions } from '@react-navigation/native'

export const Standard = ({
  title = '',
  goBack,
  leftIcon: icon,
  leftIconProps: iconProps = {},
  onPressRightIcon: onPress,
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
          justify={'space-between'}>
          <FlexWrapper width={'auto'}>
            {/* Go back button */}
            {goBack && (
              <TouchableOpacity style={styles.touch} onPress={_onGoBack}>
                <Icon name={'Back'} size={18} />
              </TouchableOpacity>
            )}

            {/* Title */}
            <H3 align="center" mLeft={goBack ? '10px' : '0px'}>
              {title}
            </H3>
          </FlexWrapper>

          {/* Icon */}
          {icon && (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
              <Icon name={icon} {...iconProps} />
            </TouchableOpacity>
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
  },
})
