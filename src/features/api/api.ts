import { HOST } from '@env'
import axios, { InternalAxiosRequestConfig } from 'axios'

// if Firebase token
import auth from '@react-native-firebase/auth'
import { UserEntities } from '@/entities/User'
import Toast from 'react-native-toast-message'

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
  error => {
    return Promise.reject(error)
  },
)

privateInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    // handleError(error)
    return Promise.reject(error)
  },
)

publicInstance.interceptors.request.use(
  async config => {
    return langConfig(config)
  },
  error => {
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
