import React, { useCallback, useContext, useMemo } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from '..'
import { TProfileProps } from './types'
import { useNavigation } from '@/features/hooks'
import { FlexWrapper, H3 } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { useTypedSelector } from '@/app/store'
import { UserEntities, getUserSelector, userActions } from '@/entities/User'
import { Button } from '@/shared/ui/button'
import { TSelectItem } from '@/shared/ui/button/Select/types'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { EScreens, EStacks } from '@/app/navigation'
import { LoaderContext } from '@/app/contexts/Loader'
import { useDispatch } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import firebaseService from '@/features/Auth/firebase.service'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { EToastType } from '@/app/contexts/Toast/types'

export const Profile = ({
  disableDots = false,
  showMyName = false,
  nameUser = '',
}: TProfileProps) => {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { user, userSessions } = useTypedSelector(getUserSelector)
  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()

  const { deleteUserMe, getUserId, setUserId, deleteUserId } =
    UserEntities.UserService

  const _onGoBack = () => {
    navigation.goBack()
  }

  const onDeleteProfile = useCallback(async () => {
    try {
      setLoading(true)
      const userId = await getUserId()

      await deleteUserMe({})
      navigation.goBack()
      let sessions = userSessions.filter(el => el._id !== userId)

      await deleteUserId()

      if (sessions.length) {
        const id = sessions[0]._id
        const newUser = userSessions.find(userSession => userSession._id === id)

        if (!newUser) {
          console.error('No Current user after delete')
          return
        }

        await setUserId(id)

        dispatch(userActions.setUserSessions(sessions))

        dispatch(userActions.setUser(newUser))
      }

      if (!sessions.length) {
        dispatch(
          userActions.setState({
            user: null,
            userSessions: [],
            registerData: undefined,
          }),
        )

        await firebaseService.signOut()

        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: EStacks.Auth }],
            index: 0,
          }),
        )
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (
          err.response?.data.message ===
          'Cant delete account with active projects'
        ) {
          Toast.show({
            type: EToastType.error,
            text2: 'toasts.active_projects',
          })
        }
      }
      console.log('onDeleteProfile err =>', err)
    } finally {
      setLoading(false)
    }
  }, [
    deleteUserId,
    deleteUserMe,
    dispatch,
    getUserId,
    navigation,
    setLoading,
    setUserId,
    userSessions,
  ])

  const popover = useMemo<TSelectItem[]>(
    () => [
      {
        title: t('edit_profile'),
        icon: 'PencelLine',
        onPress: () => {
          navigation.navigate(EScreens.ProfileAccountData, {})
        },
      },
      {
        title: t('delete_account'),
        icon: 'Delete',
        type: 'custom',
        color: EColors.error,
        onPress: () => {
          onDeleteProfile()
        },
      },
    ],
    [navigation, onDeleteProfile, t],
  )
  return (
    <>
      <Header.Container activeShadow>
        <FlexWrapper height={'100%'} style={styles.main} justify={'center'}>
          {/* Go back button */}
          <TouchableOpacity
            style={[styles.touch, styles.iconLeft]}
            onPress={_onGoBack}>
            <Icon name={'Back'} size={18} />
          </TouchableOpacity>

          {/* Title */}
          <H3 numberOfLines={1} style={styles.text}>
            {showMyName && user?.name + ' ' + (user?.secondName || '')}

            {!showMyName && nameUser}
          </H3>
          {!disableDots && (
            <Button.Select containerStyle={styles.iconRight} items={popover} />
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
  iconLeft: { position: 'absolute', left: 20 },
  iconRight: { position: 'absolute', right: 20 },

  touch: {
    padding: 5,
  },
  text: {
    width: '70%',
  },
})
