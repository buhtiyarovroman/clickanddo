import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Header } from '..'
import { TDrawerIconsHeaderProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { DrawerActions } from '@react-navigation/native'
import { IconContainer } from './styled'
import { UnreadCounter } from '../../../shared/ui/UnreadCounter'

export const DrawerIcons = ({
  onPressRightIcon = () => {},
  rightIcon,
  rightIconProps = {},
  title = '',
}: TDrawerIconsHeaderProps) => {
  const { dispatch } = useNavigation()

  const onOpenDrawer = () => {
    dispatch(DrawerActions.openDrawer())
  }

  return (
    <>
      <Header.Container>
        <FlexWrapper height={'100%'} style={styles.main} justify={'center'}>
          {/* Drawer open */}
          <IconContainer onPress={onOpenDrawer}>
            <Icon name={'DrawerBurger'} size={20} />
            <UnreadCounter showTotal />
          </IconContainer>

          <LSemibold>{title}</LSemibold>

          {rightIcon && (
            <IconContainer isRight onPress={onPressRightIcon}>
              <Icon name={rightIcon} size={20} {...rightIconProps} />
            </IconContainer>
          )}

          {!rightIcon && <View />}
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
