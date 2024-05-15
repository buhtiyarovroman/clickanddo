import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'

import { useNavigation } from '@/features/hooks'
import { Header } from '..'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { Input } from '@/shared/ui/input'
import { THeaderSearch } from './types'
import { useTranslation } from 'react-i18next'

export const Search = ({
  searchValue,
  setSearchValue,
  onFiltersPress,
}: THeaderSearch) => {
  const { dispatch } = useNavigation()
  const { t } = useTranslation()
  const onOpenDrawer = () => {
    dispatch(DrawerActions.openDrawer())
  }

  return (
    <>
      <Header.Container addHeight={24}>
        <FlexWrapper
          height={'100%'}
          style={styles.main}
          justify={'space-between'}>
          <TouchableOpacity style={styles.touch} onPress={onOpenDrawer}>
            <Icon name={'DrawerBurger'} size={20} />
          </TouchableOpacity>

          <View style={styles.input_wrapper}>
            <Input.Standard
              fontSize={15}
              disableLabel
              onChange={setSearchValue}
              value={searchValue}
              leftIcon="Search"
              leftIconProps={{ stroke: EColors.grey_600 }}
              height="40px"
              label={t('search')}
            />
          </View>

          <TouchableOpacity
            style={styles.filters}
            onPress={onFiltersPress}
            activeOpacity={0.7}>
            <Icon name="Filter" size={20} />
          </TouchableOpacity>
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
  input_wrapper: {
    width: '70%',
  },
  filters: {
    borderRadius: 9,
    width: 39,
    height: 39,
    backgroundColor: EColors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
