import React, { useEffect } from 'react'
import 'react-native-get-random-values'
import Geocoder from 'react-native-geocoding'
import ErrorBoundary from 'react-native-error-boundary'
import SplashScreen from 'react-native-splash-screen'

import { Sentry } from '@/shared/lib'
import { Navigator } from '@/app/navigation'
import { GOOGLE_API_KEY, SENTRY_DNS } from '@env'

Sentry.init({
  dsn: SENTRY_DNS,
  tracesSampleRate: 1.0,
})

// console.log = () => {}

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 1500)
  }, [])

  Geocoder.init(GOOGLE_API_KEY)

  return (
    <ErrorBoundary
      onError={error => Sentry.captureException(`ERROR => ${error}`)}>
      <Navigator />
    </ErrorBoundary>
  )
}

export default Sentry.wrap(App)
