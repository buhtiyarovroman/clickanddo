import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  createMigrate,
  MigrationManifest,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducer'
import rootSaga from './saga'
import { REDUX_KEY } from '@env'
import { EStoreReducer } from './types'
import { TInitialUserState } from '@/entities/User/store/types'
import { TInitialChatState } from '@/entities/Chat/store/types'

const whitelist: string[] = [EStoreReducer.user, EStoreReducer.chat]

type TMigratePersist = {
  user: TInitialUserState
  chat: TInitialChatState
}

const migrate: MigrationManifest = {
  '0': (state: TMigratePersist) => {
    console.log('Migrate version 0')

    if (!state.user.hasOwnProperty('userLocation')) {
      state.user.userLocation = null
    }

    return state
  },
}

const persistedReducer = persistReducer(
  {
    key: REDUX_KEY,
    storage: AsyncStorage,
    whitelist,
    version: 0,
    migrate: createMigrate(migrate),
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
