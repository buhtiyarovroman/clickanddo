import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from '..'
import { TChatHeaderProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, MRegular, MSemibold } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TChatStack } from '@/app/navigation/stacks/Chat'
import { EScreens } from '@/app/navigation'
import { useGetUserById } from '@/features/User/hooks'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { ImageUser, TouchableUser } from './styled'

export const Chat = ({}: TChatHeaderProps) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { to } = useRoute<RouteProp<TChatStack, EScreens.ChatChat>>().params
  const { user } = useGetUserById({ id: to, disableLoader: true })
  const isOnline = !!user?.online

  const onlineColor = isOnline ? EColors.primary : EColors.grey_600

  const _onGoBack = () => {
    navigation.goBack()
  }

  const onNavigate = () => {
    console.log('press')
    navigation.navigate(EScreens.JobStack, {
      screen: EScreens.JobProfile,
      params: { id: to },
    })
  }

  return (
    <>
      <Header.Container>
        <FlexWrapper
          height={'100%'}
          style={styles.main}
          flexDirection={'column'}>
          <FlexWrapper mBottom={'16px'} width={'100%'} justify={'flex-start'}>
            {/* Go back button */}
            <TouchableOpacity style={styles.touch} onPress={_onGoBack}>
              <Icon name={'Back'} size={18} />
            </TouchableOpacity>

            {!!user && (
              <TouchableUser onPress={onNavigate}>
                <ImageUser source={user?.photo} />

                <FlexWrapper
                  mLeft={'10px'}
                  flexDirection={'column'}
                  align={'flex-start'}
                  style={styles.text}>
                  <MSemibold numberOfLines={1}>
                    {user?.name} {user?.secondName}
                  </MSemibold>
                  <MRegular color={onlineColor}>
                    {isOnline ? t('online') : t('offline')}
                  </MRegular>
                </FlexWrapper>
              </TouchableUser>
            )}
          </FlexWrapper>
        </FlexWrapper>
      </Header.Container>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  touch: {
    padding: 5,
  },
  text: {
    maxWidth: '70%',
  },
})
