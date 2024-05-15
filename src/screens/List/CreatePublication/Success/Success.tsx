import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

import { EScreens } from '@/app/navigation'
import { useNavigation } from '@/features/hooks'

import { Icon } from '@/shared/ui/Icon'
import { Button } from '@/shared/ui/button'
import { EColors, Styled } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'

import { Container } from './styled'

export const Success = () => {
  const { t } = useTranslation()

  const { navigate } = useNavigation()

  const [height, setHeight] = useState<number>(0)

  const onNavigate = () => {
    navigate(EScreens.ListMain)
  }

  return (
    <>
      <FlexWrapper mTop={`${wp(42)}px`}>
        <Icon
          name={'PublicationSuccess'}
          size={wp(65)}
          fill={EColors.transparent}
        />
      </FlexWrapper>

      <Container bottom={height}>
        <Styled.H2 align="center" mBottom={'16px'}>
          {t('new_publication.success.title')}
        </Styled.H2>

        <Styled.MRegular align="center" color={EColors.grey_600}>
          {t('new_publication.success.subtitle')}
        </Styled.MRegular>
      </Container>

      <CustomBottomBar disableShadow getHeight={setHeight}>
        <Button.Standard opacity={0.8} height={'60px'} onPress={onNavigate}>
          <Styled.LMedium color={EColors.white} mRight={'10px'}>
            {t('next')}
          </Styled.LMedium>

          <Icon name={'ArrowRight'} size={16} />
        </Button.Standard>
      </CustomBottomBar>
    </>
  )
}
