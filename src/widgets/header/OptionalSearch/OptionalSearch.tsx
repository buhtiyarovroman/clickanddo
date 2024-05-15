import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { DrawerActions } from '@react-navigation/native'

import { useNavigation } from '@/features/hooks'
import { Header } from '..'
import { FlexWrapper, LSemibold, MMedium } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { Input } from '@/shared/ui/input'

import { useTranslation } from 'react-i18next'
import { THeaderSearch } from '../Search/types'

export const OptionalSearch = ({
  searchValue,
  setSearchValue,
}: THeaderSearch) => {
  const { dispatch } = useNavigation()
  const { t } = useTranslation()
  const [searchOpen, setSearchOpen] = useState(false)

  const onOpenDrawer = () => {
    dispatch(DrawerActions.openDrawer())
  }

  const toggleSearch = () => {
    if (searchOpen) {
      setSearchValue('')
    }
    setSearchOpen(prev => !prev)
  }
  return (
    <>
      <Header.Container addHeight={24}>
        <FlexWrapper
          width="100%"
          height={'100%'}
          style={styles.main}
          justify={'space-between'}>
          {!searchOpen && (
            <TouchableOpacity style={styles.touch} onPress={onOpenDrawer}>
              <Icon name={'DrawerBurger'} size={20} />
            </TouchableOpacity>
          )}

          {searchOpen ? (
            <View style={styles.input_wrapper}>
              <Input.Standard
                fontSize={15}
                disableLabel
                onChange={setSearchValue}
                value={searchValue}
                leftIcon="Search"
                leftIconProps={{ stroke: EColors.grey_600 }}
                height="45px"
                label={t('search_by_publication')}
              />
            </View>
          ) : (
            <LSemibold>{t('favorites.title')}</LSemibold>
          )}

          <TouchableOpacity
            style={styles.filters}
            onPress={toggleSearch}
            activeOpacity={0.7}>
            {!searchOpen ? (
              <Icon name="Search" stroke={EColors.black} size={30} />
            ) : (
              <MMedium>{t('cancel')}</MMedium>
            )}
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
    width: '84%',
  },
  filters: {
    height: 39,

    justifyContent: 'center',
    alignItems: 'center',
  },
})
