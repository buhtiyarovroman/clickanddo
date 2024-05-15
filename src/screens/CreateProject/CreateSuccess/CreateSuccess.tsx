import { Background } from '@/shared/ui/background'
import React from 'react'
import { styles } from './styled'
import { useTranslation } from 'react-i18next'
import { EScreens } from '@/app/navigation'
import { Icon } from '@/shared/ui/Icon'
import { Dimensions } from 'react-native'
import { FlexWrapper, H2, LRegular, MRegular } from '@/shared/ui/Styled/Styled'
import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { RouteProp, useRoute } from '@react-navigation/native'
import { TCreateProjectStack } from '@/app/navigation/stacks/CreateProject'
import { useClearCreateProject } from '@/features/Projects/hooks'

const { width } = Dimensions.get('screen')
const ICON_SIZE = width - 80

export const CreateSuccess = () => {
  const { t } = useTranslation()
  const nav =
    useRoute<RouteProp<TCreateProjectStack, EScreens.ProjectCreateSuccess>>()
      .params

  const { onClearNavigate } = useClearCreateProject(nav)

  const onGoMain = () => {
    onClearNavigate()
  }
  const isDraft = nav.isDraft
  const isSpecialist = nav.isSpecialist

  return (
    <>
      <Background.SafeArea
        edges={['top', 'bottom']}
        style={styles.main}
        pHorizontal={20}>
        <FlexWrapper
          flexDirection={'column'}
          height={'100%'}
          justify={'space-around'}>
          <Icon name={'CreateProjectSuccess'} size={ICON_SIZE} />

          <FlexWrapper flexDirection={'column'}>
            <H2 align={'center'} mBottom={'16px'}>
              {isDraft ? t('offer_held') : t('offer_published')}
            </H2>

            {!isSpecialist && !isDraft && (
              <MRegular color={EColors.grey_600} mBottom={'32px'}>
                {t('offer_published_description')}
              </MRegular>
            )}

            {!isDraft && isSpecialist && (
              <MRegular color={EColors.grey_600} mBottom={'32px'}>
                {t('invite_specialist_sended')}
              </MRegular>
            )}

            <Button.Standard onPress={onGoMain}>
              <FlexWrapper width={'auto'}>
                <LRegular mRight={'10px'} color={EColors.white}>
                  {t('next')}
                </LRegular>
                <Icon name={'ArrowRight'} size={18} />
              </FlexWrapper>
            </Button.Standard>
          </FlexWrapper>
        </FlexWrapper>
      </Background.SafeArea>
    </>
  )
}
