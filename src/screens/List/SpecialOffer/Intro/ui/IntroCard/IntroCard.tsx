import React from 'react'
import { View, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { Png } from '@assets/Png'
import { MRegular, H2SemiBold, MMedium } from '@/shared/ui/Styled/Styled'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { styles } from './styles'
import { TIntroCardProps } from './types'

export const IntroCard = ({ onPressCreate }: TIntroCardProps) => {
  const { t } = useTranslation()
  return (
    <View style={styles.wrapper}>
      <View style={styles.action_wrapper}>
        <MRegular color={EColors.white} mBottom="5px">
          {t('special_offers')}
        </MRegular>
        <H2SemiBold color={EColors.white}>{t('set_up_now')}</H2SemiBold>
        <Button.Standard
          onPress={onPressCreate}
          color={EColors.white}
          width={`${wp(50)}px`}
          mTop="30px">
          <MMedium>{t('create_offer')}</MMedium>
        </Button.Standard>
      </View>
      <Image style={styles.image} source={Png.SpecialOfferFrame} />
    </View>
  )
}
