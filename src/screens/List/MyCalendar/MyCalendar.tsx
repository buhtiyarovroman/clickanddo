import React from 'react'
import { useTranslation } from 'react-i18next'

import { Header } from '@/widgets/header'
import { Button } from '@/shared/ui/button'
import { Background } from '@/shared/ui/background'

import { styles } from './styled'

export const MyCalendar = () => {
  const { t } = useTranslation()

  return (
    <>
      <Header.CenterTitle goBack title={t('my_calendar')} disableShadow />

      <Button.Adventure title={t('new_requests')} />

      <Background.Standard
        style={styles.main}
        pHorizontal={20}></Background.Standard>
    </>
  )
}
