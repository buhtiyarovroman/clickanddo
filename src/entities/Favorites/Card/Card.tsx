import React from 'react'
import { TouchableOpacity } from 'react-native'

import {
  FlexWrapper,
  LSemibold,
  MRegular,
  SMedium,
  Touchable,
} from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/Icon'
import { styles, InvalidContainer } from './styles'
import { Image } from '@/shared/ui/image'
import { TCardProps } from './types'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { TPublication } from '@/entities/Publication/models'
import { TImageType } from '@/shared/ui/image/Standard/types'
import { TUser } from '@/entities/User/models'
import { useTranslation } from 'react-i18next'
import { useCreateChat } from '@/features/Chat'

export const Card = ({
  type = 'publication',
  name = '',
  image,
  favorite,
  onDeletePress = () => {},
}: TCardProps) => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()

  const { onCreateChat } = useCreateChat({})

  const isSpecialist = type === 'specialist'

  const imageType: TImageType = isSpecialist ? 'user' : 'publication'

  const rate = (favorite as TUser).rating

  const _onCreateChat = () => {
    onCreateChat((favorite as TUser)._id)
  }

  const onImagePress = () => {
    if ('type' in favorite) {
      let publication: TPublication = favorite

      navigate(EScreens.FavoritesPublicationStack, {
        screen: EScreens.PublicationScreen,
        params: {
          id: publication._id,
          type: publication.type,
        },
      })

      return
    }

    if ('role' in favorite) {
      let user: TUser = favorite

      navigate(EScreens.JobStack, {
        screen: EScreens.JobProfile,
        params: {
          id: user._id,
        },
      })
    }
  }

  const onIsInvalid = () => {
    const isSpecialOffer = type === 'special-offer'

    if (isSpecialOffer && 'type' in favorite) {
      let publication: TPublication = favorite

      return (publication?.projects || 0) >= 1
    }

    return false
  }

  const ivVisible = onIsInvalid()

  return (
    <FlexWrapper style={styles.container}>
      <FlexWrapper style={styles.first_row}>
        <TouchableOpacity onPress={onImagePress}>
          <Image.Standard
            type={imageType}
            source={image}
            style={styles.avatar}
          />
          {!!rate && (
            <FlexWrapper style={styles.rating}>
              <Icon name="Star" fill={EColors.warning} size={14} />
              <SMedium mLeft="2px">{Math.round(rate)}</SMedium>
            </FlexWrapper>
          )}
        </TouchableOpacity>
        <FlexWrapper style={styles.actions_wrapper}>
          {isSpecialist && (
            <Button.Standard
              onPress={_onCreateChat}
              iconProps={{ size: 20 }}
              icon="Envelope"
              style={styles.action}
              mBottom={'5px'}
            />
          )}

          <Touchable width={'auto'} onPress={onDeletePress}>
            <Icon name={'HeartFill'} fill={EColors.error} size={30} />
          </Touchable>

          {/* <Button.Standard
            onPress={onDeletePress}
            icon="HeartFillDisable"
            mTop={isSpecialist ? '16px' : '0px'}
            iconProps={{
              fill: EColors.transparent,
              stroke: EColors.grey_800,
              size: 22,
            }}
            style={styles.second_action}
          /> */}
        </FlexWrapper>
      </FlexWrapper>
      <FlexWrapper flexDirection="column" align="flex-start">
        <LSemibold mTop="16px" numberOfLines={2}>
          {name}
          {name}
          {name}
        </LSemibold>
      </FlexWrapper>

      {ivVisible && (
        <InvalidContainer>
          <Icon name={'CloseRound'} />

          <MRegular mLeft={'5px'}>{t('inactive')}</MRegular>
        </InvalidContainer>
      )}
    </FlexWrapper>
  )
}
