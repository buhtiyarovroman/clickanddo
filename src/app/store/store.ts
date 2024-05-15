import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import rootSaga from './saga'
import { REDUX_KEY } from '@env'
import { EStoreReducer } from './types'

const whitelist: string[] = [EStoreReducer.user, EStoreReducer.chat]

const persistedReducer = persistReducer(
  {
    key: REDUX_KEY,
    storage: AsyncStorage,
    whitelist,
  },
  rootReducer,
)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

if (__DEV__) {
  const createDebugger = require('redux-flipper').default
  middlewares.push(createDebugger())
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
  devTools: true,
})

export const persistor = persistStore(store)

// Run saga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch

export default store
