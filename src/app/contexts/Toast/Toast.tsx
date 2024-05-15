import React from 'react'
import { createContext } from 'react'
import {
  EToastType,
  TToastContext,
  TToastContextActions,
  TToastContextProps,
} from './types'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  ToastConfig,
} from 'react-native-toast-message'

export const ToastContext = createContext<TToastContext>({
  actions: {
    emptyCar: () => {},
    authError: () => {},
    handleErrorTranslate: () => {},
    succesAddCar: () => {},
  },
})

export const ToastWrapper = ({ children }: TToastContextProps) => {
  const { t, keys } = useTranslation()

  const toastConfig: ToastConfig = {
    // requires for dosc
    // eslint-disable-next-line react/no-unstable-nested-components
    [EToastType.success]: props => (
      <BaseToast
        {...props}
        text1={
          props?.text1
            ? t(props?.text1 as keyof typeof keys)
            : t('toasts.success')
        }
        text2={props?.text2 ? t(props?.text2 as keyof typeof keys) : ''}
        style={styles.successToast}
        contentContainerStyle={styles.toastContainer}
        text1Style={styles.text1}
        text2Style={styles.text2}
        text1NumberOfLines={2}
        text2NumberOfLines={3}
      />
    ),
    // eslint-disable-next-line react/no-unstable-nested-components
    [EToastType.error]: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        text1={
          props?.text1
            ? t(props?.text1 as keyof typeof keys)
            : t('errors.error')
        }
        text2={props?.text2 ? t(props?.text2 as keyof typeof keys) : ''}
        style={styles.errorToast}
        contentContainerStyle={styles.toastContainer}
        text1Style={styles.text1}
        text2Style={styles.text2}
        text1NumberOfLines={2}
        text2NumberOfLines={3}
      />
    ),
  }

  const actions: TToastContextActions = {
    emptyCar: (value: string) => {
      // Toast.show({
      //   type: 'error',
      //   text1: t('toast.error'),
      //   text2: value,
      // })
    },
    authError: (error: string = '') => {
      // Toast.show({
      //   type: 'error',
      //   text1: '',
      //   text2: t(`${onErrorCode(error)}`),
      // })
    },

    handleErrorTranslate: (error: string = '') => {
      // Toast.show({
      //   type: 'error',
      //   text1: 'toast.error',
      //   text2: error,
      // })
    },
    succesAddCar: () => {
      // Toast.show({
      //   type: 'success',
      //   text2: 'toast.addCar',
      // })
    },
  }
  return (
    <ToastContext.Provider value={{ actions }}>
      {children}
      <Toast config={toastConfig} />
    </ToastContext.Provider>
  )
}
