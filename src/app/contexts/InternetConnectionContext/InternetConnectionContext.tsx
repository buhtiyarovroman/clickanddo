import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import NetInfo from '@react-native-community/netinfo'
import RNRestart from 'react-native-restart'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'

import { TInternetConnectionContext } from './types'
import { Icon } from '@/shared/ui/Icon'
import { EColors } from '@/shared/ui/Styled'
import { LSemibold } from '@/shared/ui/Styled/Styled'
import { Button } from '@/shared/ui/button'
import { Container } from './styled'

const InternetConnectionContext = createContext<TInternetConnectionContext>({
  connected: true,
})
export default InternetConnectionContext

export const InternetConnectionContextProvider = ({
  children,
}: PropsWithChildren) => {
  const [connected, setConnected] = useState(true)
  const { t } = useTranslation()

  const changeConnectionStatus = _.debounce((status: boolean) => {
    setConnected(status)
  }, 2000)

  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      changeConnectionStatus(networkState?.isInternetReachable ?? true)
    })
  }, [])

  const onReloadApp = () => {
    RNRestart.Restart()
  }

  return (
    <InternetConnectionContext.Provider value={{ connected }}>
      {!connected && (
        <Container>
          <Icon name={'NoWifi'} fill={EColors.primary} size={100} />
          <LSemibold align={'center'} mBottom={'20px'}>
            {t('no_internet_connection')}
          </LSemibold>

          <Button.Standard onPress={onReloadApp} text={t('restart_app')} />
        </Container>
      )}

      {children}
    </InternetConnectionContext.Provider>
  )
}
