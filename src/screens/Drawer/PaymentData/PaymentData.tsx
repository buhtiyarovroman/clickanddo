import React from 'react'
import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'
import { Background } from '@/shared/ui/background'

import { styles } from './styled'

export const PaymentData = () => {
  const { t } = useTranslation()

  return (
    <>
      <Header.Standard title={t('payment_data')} goBack />

      <Background.Standard style={styles.main} pHorizontal={20}>
        <></>
      </Background.Standard>
    </>
  )
}
