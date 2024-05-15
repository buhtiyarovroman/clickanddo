import { useContext, useState } from 'react'
import { ONESIGNAL_APP_ID } from '@env'
import React, { createContext, useCallback, useEffect } from 'react'

import OneSignal, { OpenedEvent } from 'react-native-onesignal'
import {
  TPushNotificationContext,
  TNotificationContextPayload,
  TNotificationPayload,
  EPushType,
} from './types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { EScreens, ETabStacks } from '@/app/navigation'
import { ChatService } from '@/entities/Chat/services'
import { LoaderContext } from '../Loader'
import { ProjectsService } from '@/entities/Projects/services'
import { PublicationService } from '@/entities/Publication/services'
import { useDispatch } from 'react-redux'
import { notificationsActions } from '@/entities/Notifications/store/actions'
import { useGetNotifications } from '@/features/Notifications'
import { CommonActions } from '@react-navigation/native'
// import auth from '@react-native-firebase/auth'

export const PushNotificationsContext =
  createContext<TNotificationContextPayload>({
    enablePush: () => {},
    playerId: '',
  })

// OneSignal Initialization
OneSignal.setAppId(ONESIGNAL_APP_ID)

export const PushNotificationWrapper = ({
  children,
}: TPushNotificationContext) => {
  const { user, setting } = useTypedSelector(getUserSelector)
  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()
  const [playerId, setPlayerId] = useState('')
  const { navigate, dispatch: navigateDispatch } = useNavigation()
  const { getNotificationCount } = useGetNotifications({})

  const notificationOpenHandler = useCallback(
    async (notification: OpenedEvent) => {
      try {
        const payload = notification.notification
          .additionalData as TNotificationPayload

        setLoading(true)

        dispatch(notificationsActions.getNotificationsRequest({}))

        if (payload.type === EPushType.chat) {
          if (payload.id) {
            const { data: chatResponse } = await ChatService.getChatById({
              id: payload.id,
            })

            const to = chatResponse.members.filter(
              item => item._id !== user?._id,
            )

            if (to.length) {
              if (chatResponse.project) {
                const project = await ProjectsService.getProjectById({
                  id: chatResponse.project,
                  currency: setting.currency,
                })

                navigate(ETabStacks.Projects, {
                  screen: EScreens.ProjectJobStack,

                  params: {
                    screen: EScreens.JobMain,
                    params: {
                      project: project.data,
                      screen: EScreens.ChatChat,
                      params: {
                        id: payload.id,
                        to: to[0]._id,
                        isProject: true,
                      },
                      initial: false,
                    },
                  },
                })
                // navigateDispatch(
                //   CommonActions.reset({
                //     routes: [
                //       { name: },
                //       { name:  },
                //       { name: EScreens.JobMain, params: { project: project } },
                //       {
                //         name: ,
                //         params: {

                //         },
                //       },
                //     ],
                //     index: 3,
                //   }),
                // )

                return
              }
              navigate(ETabStacks.Chat, {
                screen: EScreens.ChatChat,
                params: { id: payload.id, to: to[0]._id },
                initial: false,
              })
            }
          }
        }

        if (payload.type === EPushType.project) {
          if (!payload.id) {
            //TODO project toast
            return
          }

          const { data: projectResponse } =
            await ProjectsService.getProjectById({
              id: payload.id,
              currency: setting.currency,
            })

          if (!projectResponse) return

          navigate(ETabStacks.Home, {
            screen: EScreens.HomeJobStackScreen,

            params: {
              screen: EScreens.JobMain,
              params: { project: projectResponse },
              initial: false,
            },
          })
        }

        if (payload.type === EPushType.publication) {
          if (!payload.id) {
            //TODO project toast
            return
          }

          const { data: publicationResponse } =
            await PublicationService.getPublicationById({
              id: payload.id,
            })

          if (!publicationResponse) return

          navigate(ETabStacks.List, {
            screen: EScreens.ListPublicationStack,
            params: {
              screen: EScreens.PublicationScreen,
              params: {
                type: publicationResponse.type,
                id: publicationResponse._id,
              },
              initial: false,
            },
            initial: false,
          })
        }
      } catch {
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const enablePush = (enable: boolean) => {
    OneSignal.disablePush(!enable)

    // dispatch(userActions.setSetting({ push: enable }))
    // dispatch(
    //   localStorageActions.setSettings({ pushNotificationsEnabled: enable }),
    // )
  }

  useEffect(() => {
    // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
    OneSignal.promptForPushNotificationsWithUserResponse()

    OneSignal.setNotificationWillShowInForegroundHandler(() => {
      console.log('NEW PUSH')
      getNotificationCount()
    })

    //Method for handling notifications opened
    OneSignal.setNotificationOpenedHandler(notificationOpenHandler)
  }, [notificationOpenHandler])

  // Set device id to user profile
  // useEffect(
  //   () => {
  //     ;(async () => {
  // const deviceState = await OneSignal.getDeviceState()
  // if (!deviceState?.userId) return
  // // OneSignal.disablePush(false)

  // setPlayerId(deviceState?.userId)
  // putUser(deviceState?.userId)

  // console.log(deviceState?.userId)

  // dispatch(userActions.pu({ playerId: deviceState.userId }))
  //   })()
  // },
  // [
  // dispatch,
  // FBUser,
  // user?.id
  //   ],
  // )

  useEffect(() => {
    if (user?._id) {
      console.log('EXTERNAL_ID =>', user._id)
      OneSignal.setExternalUserId(user._id)
    }
  }, [user?._id])

  return (
    <>
      <PushNotificationsContext.Provider value={{ enablePush, playerId }}>
        {children}
      </PushNotificationsContext.Provider>
    </>
  )
}
