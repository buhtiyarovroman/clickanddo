import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react'
import { Socket, io } from 'socket.io-client'
import { TWebSocketContext } from './types'

import auth from '@react-native-firebase/auth'
import { SOCKET_BASE, SOCKET_WS_PATH } from '@env'
import { getUserSelector, UserEntities } from '@/entities/User'
import { useTypedSelector } from '@/app/store'
import { TMessage } from '@/entities/Chat/models'
import { useDispatch } from 'react-redux'
import { chatActions } from '@/entities/Chat/store'
import { useGetChats } from '@/features/Chat'
import { useGetNotifications } from '@/features/Notifications'

const SocketIOContext = createContext<TWebSocketContext>({})

export default SocketIOContext

export const SocketIOContextProvider = ({ children }: PropsWithChildren) => {
  const ref = useRef<Socket | null>(null)
  const { user } = useTypedSelector(getUserSelector)
  const dispatch = useDispatch()
  const { getFirstPage } = useGetChats({})
  const { getNotificationCount } = useGetNotifications({})

  useEffect(() => {
    ;(async () => {
      const token = await auth().currentUser?.getIdToken(true)
      const userId = await UserEntities.UserService.getUserId()

      if (!userId) {
        // console.error('SOCKET ERR ->, no session user')
        return
      }

      // console.log('SOCKET_Config =>', userId)
      const socket = io(SOCKET_BASE, {
        autoConnect: true,
        forceNew: true,
        reconnection: true,
        path: SOCKET_WS_PATH,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
          ...(userId
            ? {
                'session-user': userId,
              }
            : {}),
        },
      })

      socket.on('connect', () => {
        // console.warn('SOCKET: CONNECT')
      })
      socket.on('connect_error', err => {
        // console.warn('SOCKET: CONNECT_ERROR ', err.message)
      })
      socket.on('disconnect', logs => {
        // console.warn('SOCKET: DISCONNECT: ', logs)
      })

      socket.on('newChat', (data: unknown) => {
        getFirstPage()
        getNotificationCount()
      })
      socket.on('newMessage', (data: TMessage) => {
        dispatch(
          chatActions.setSocketMessage({ message: data, userId: userId }),
        )
        getNotificationCount()
      })
      ref.current = socket
    })()

    const intervalId = setInterval(() => {
      if (user?._id) dispatch(chatActions.getAllUnreadCountRequest({}))
    }, 10000)

    return () => {
      clearInterval(intervalId)

      // console.warn('SOCKET: DISCONNECT ')
      ref.current?.disconnect()
    }
  }, [user?._id])

  return (
    <SocketIOContext.Provider value={{}}>{children}</SocketIOContext.Provider>
  )
}
