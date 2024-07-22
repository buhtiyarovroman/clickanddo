import React, { ReactNode } from 'react'
import { SafeAreaWrapper } from './SafeArea'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { LanguageProvider } from './Language'
import { Provider } from 'react-redux'
import { persistor, store } from '../store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeWrapper } from './Theme'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { LoaderWrapper } from './Loader'
import { ToastWrapper } from './Toast'
import { SocketIOContextProvider } from './SocketIO/SocketIO'
import { InternetConnectionContextProvider } from './InternetConnectionContext'
import { PushNotificationWrapper } from './PushNotification'

import { KeyboardProvider } from 'react-native-keyboard-controller'

type TContext = {
  children: ReactNode
}

export const Contexts = ({ children }: TContext) => (
  <>
    {/*  Redux */}
    <Provider store={store}>
      {/* Persist store */}
      <PersistGate loading={null} persistor={persistor}>
        {/*  SaveAreaView */}
        <SafeAreaWrapper>
          {/* GestureHandler */}
          <GestureHandlerRootView style={styles.gestureHandlerContainer}>
            {/* BottomSheetModal */}
            <ThemeWrapper>
              {/* Loader */}
              <LoaderWrapper>
                {/* OneSignal Context */}
                <PushNotificationWrapper>
                  {/* BottomSheetModalProvider */}
                  <BottomSheetModalProvider>
                    <InternetConnectionContextProvider>
                      {/* Language */}
                      <KeyboardProvider>
                        <LanguageProvider>
                          <ToastWrapper>
                            <SocketIOContextProvider>
                              {children}
                            </SocketIOContextProvider>
                          </ToastWrapper>
                        </LanguageProvider>
                      </KeyboardProvider>
                    </InternetConnectionContextProvider>
                  </BottomSheetModalProvider>
                </PushNotificationWrapper>
              </LoaderWrapper>
            </ThemeWrapper>
          </GestureHandlerRootView>
        </SafeAreaWrapper>
      </PersistGate>
    </Provider>
  </>
)

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
})
