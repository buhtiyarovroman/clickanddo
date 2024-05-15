import { LoaderContext } from '@/app/contexts/Loader'
import { EScreens, EStacks } from '@/app/navigation'
import { userActions, UserEntities } from '@/entities/User'
import { TUser } from '@/entities/User/models'
import { UserService } from '@/entities/User/services'
import { useNavigation } from '@/features/hooks'

import { CommonActions } from '@react-navigation/native'
import { useCallback, useContext } from 'react'
import { useDispatch } from 'react-redux'
import auth from '@react-native-firebase/auth'
import { Sentry } from '@/shared/lib'

export const useAuthNavigate = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { setLoading } = useContext(LoaderContext)
  // const { playerId } = useContext(PushNotificationsContext)

  const onInitialGetUser = async () => {
    try {
      setLoading(true)
      const firebaseId = auth().currentUser?.uid

      if (!firebaseId) {
        console.error('No FirebaseId')
        return
      }

      const response = await UserEntities.UserService.getAllUsers({
        firebaseId,
      })

      onAuthNavigate(response.data.docs)
    } catch (err) {
      console.log('getUser =>', err)
      Sentry.captureException(`getUser Error => ${err}`)
    } finally {
      setLoading(false)
    }
  }

  const onGoToRegister = useCallback(() => {
    navigation.navigate(EScreens.AuthRegister, {
      screen: EScreens.RegisterMain,
    })
  }, [navigation])

  const onGoToHome = useCallback(() => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: EStacks.Drawer }],
      }),
    )
  }, [navigation])

  const onAuthNavigate = useCallback(
    async (user?: TUser[] | null) => {
      if (!user) {
        console.error('onAuthNavigate => no users')
        return
      }

      if (user?.length === 0) {
        onGoToRegister()

        return
      }

      dispatch(userActions.setUser(user[0]))

      dispatch(userActions.setUserSessions(user))

      await UserService.setUserId(user[0]._id)

      onGoToHome()
    },
    [dispatch, onGoToHome, onGoToRegister],
  )

  return {
    onAuthNavigate,
    onInitialGetUser,
  }
}
