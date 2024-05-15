import React, { useContext, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ValueType } from 'react-native-dropdown-picker'

import { LanguageContext } from '@/app/contexts'
import { TLanguages, ELanguages } from '@/app/i18n/types'

import { Header } from '@/widgets/header'
import { Input } from '@/shared/ui/input'
import { Background } from '@/shared/ui/background'

import { styles } from './styled'
import { getLanguages } from './config'
import { TCurrencyValue } from '@/widgets/bottomSheet/Currency/types'
import { useDispatch } from 'react-redux'
import { getUserSelector, userActions } from '@/entities/User'
import { useTypedSelector } from '@/app/store'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { TCurrencyPickData } from './types'

export const Settings = () => {
  const dispatch = useDispatch()
  const { setting } = useTypedSelector(getUserSelector)

  const { t, i18n, keys } = useTranslation()

  const languages = getLanguages({ t, keys })

  const currencyData: TCurrencyPickData[] = [
    {
      label: `${t('currency.uah')} (UAH)`,
      value: 'UAH',
    },

    {
      label: `${t('currency.eur')} (EUR)`,
      value: 'EUR',
    },
    {
      label: `${t('currency.pln')} (PLN)`,
      value: 'PLN',
    },
    {
      label: `${t('currency.usd')} (USD)`,
      value: 'USD',
    },
  ]

  const { setLanguage } = useContext(LanguageContext)

  const [defLanguage, setDefLanguage] = useState<ELanguages>(
    i18n.language as TLanguages,
  )

  const [defCurrency, setDefCurrency] = useState<TCurrencyValue>(
    setting.currency,
  )

  useEffect(() => {
    const DEF_LANG = languages?.find(el => el.value === i18n.language)?.value
    // console.log('DEF_LANG', DEF_LANG)

    setDefLanguage(DEF_LANG ?? ELanguages.en)
  }, [])

  const onSelect = (val: ValueType) => {
    setLanguage(val as ELanguages)
    setDefLanguage(val as ELanguages)
  }

  const onSelectCurrency = (val: ValueType) => {
    setDefCurrency(val as TCurrencyValue)
    dispatch(
      userActions.setState({
        setting: {
          ...setting,
          currency: val as TCurrencyValue,
        },
      }),
    )
  }

  return (
    <>
      <Header.Standard title={t('settings')} goBack />

      <Background.Standard style={styles.main} pHorizontal={20}>
        <Input.Dropdown
          value={defLanguage}
          onSelect={onSelect}
          items={languages}
          label={t('choose_lang')}
        />

        <FlexWrapper mTop={'20px'} />

        <Input.Dropdown
          value={defCurrency}
          onSelect={onSelectCurrency}
          items={currencyData}
          label={t('base_currency')}
        />
      </Background.Standard>
    </>
  )
}
