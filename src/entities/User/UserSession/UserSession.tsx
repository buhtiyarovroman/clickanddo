import React from 'react'
import { useTranslation } from 'react-i18next'
import { TUserSessionProps } from './types'
import { SectionContainer, ProfileImage } from './styled'
import { FlexWrapper, LSemibold, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import { TIconsKeys } from '@assets/Svg'
import { Input } from '@/shared/ui/input'
import { useTypedSelector } from '@/app/store'
import { getChatSelector } from '@/entities/Chat/store'
import { View } from 'react-native'
import { UnreadCounter } from '@/shared/ui/UnreadCounter'

export const UserSession = ({
  name = '',
  secondName = '',
  photo = '',
  isSelected = false,
  isActive = false,
  isOpen = false,
  role = 'customer',
  _id,
  showCountMessage = false,
  onPress = () => {},
  login = '',
  ...props
}: TUserSessionProps) => {
  const { t } = useTranslation()

  const { allUnreadCount } = useTypedSelector(getChatSelector)

  const currentCount = allUnreadCount?.find(el => el._id === _id)?.count || 0

  const currentColor = isActive ? EColors.primary : EColors.black

  const CurrentIcon: TIconsKeys = isOpen ? 'AngleArrowUp' : 'AngleArrowDown'
  return (
    <SectionContainer onPress={onPress} {...props}>
      <FlexWrapper justify={'flex-start'} width={'auto'}>
        {/* User photo */}
        <View>
          {showCountMessage && <UnreadCounter count={currentCount} />}
          <ProfileImage isSelected={isSelected} source={photo} />
        </View>
        {/* user info */}
        <FlexWrapper
          width={'63%'}
          mLeft={'16px'}
          flexDirection={'column'}
          align={'flex-start'}>
          <LSemibold numberOfLines={1} color={currentColor}>
            @{login}
          </LSemibold>

          {/* Role user */}
          <SRegular color={EColors.grey_600}>{t(role)}</SRegular>
        </FlexWrapper>
      </FlexWrapper>

      {!isSelected && <Icon name={CurrentIcon} fill={EColors.transparent} />}
      {isSelected && <Input.Checkbox value={isActive} onChange={onPress} />}
    </SectionContainer>
  )
}
