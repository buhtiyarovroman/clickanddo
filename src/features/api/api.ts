import { HOST } from '@env'
import axios, { InternalAxiosRequestConfig } from 'axios'

// if Firebase token
import auth from '@react-native-firebase/auth'
import { userActions, UserEntities } from '@/entities/User'
import Toast from 'react-native-toast-message'
import { store } from '@/app/store'
import { EStacks, Navigation } from '@/app/navigation'
import { chatActions } from '@/entities/Chat/store'

console.log('HOST =>', HOST)

const privateInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

const publicInstance = axios.create({
  baseURL: HOST,
  headers: {
    'Content-Type': 'application/json',
  },
})

const langConfig = (config: InternalAxiosRequestConfig<unknown>) => {
  // Append current lang
  // const lang = i18next.language || ELanguages.en

  // // If get method
  // if (['get'].includes(config.method as string)) {
  //   config.params = { lang, ...config.params }
  //   return config
  // }

  return config
}

privateInstance.interceptors.request.use(
  async config => {
    const token = await auth().currentUser?.getIdToken(true)

    const userId = await UserEntities.UserService.getUserId()

    console.log('token =>', token)

    if (token && config.headers) {
      //invalid error
      //@ts-ignore
      config.headers = {
        ...config.headers,
        Authorization: 'Bearer ' + token,
        ...(userId
          ? {
              'session-user': userId,
            }
          : {}),
      }
    }

    // console.log('config.headers =>', config.headers)

    // console.log('url =>', config?.baseURL + config?.url, config.params)

    return langConfig(config)
  },
  error => Promise.reject(error),
)

privateInstance.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        store.dispatch(userActions.logout())
        store.dispatch(chatActions.clearState())

        auth().signOut()
        Navigation.ref.reset({
          index: 0,
          routes: [{ name: EStacks.Auth }],
        })
      }
      console.log('error inter =>', error.response?.status)
    }
    // handleError(error)
    return Promise.reject(error)
  },
)

publicInstance.interceptors.request.use(
  async config => langConfig(config),
  error => {
    if (axios.isAxiosError(error)) {
      console.log('error inter =>', error.code)
    }
    return Promise.reject(error)
  },
)

export const handleError = (error: unknown) => {
  if (axios.isAxiosError(error))
    Toast.show({
      type: 'error',
      text1: 'Error: ' + error.response?.status,
      text2: error.response?.data.message || '',
    })
}

export const apiPrivate = privateInstance
export const apiPublic = publicInstance
