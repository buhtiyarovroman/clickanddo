import { FlexWrapper, LRegular } from '@/shared/ui/Styled/Styled'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { VariantContainer, VariantItem } from './styled'
import { ELoginType } from './types'
import { EColors } from '@/shared/ui/Styled'
import { LoginEmail } from '../LoginEmail'
import { LoginPhone } from '../LoginPhone'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Dimensions } from 'react-native'

const loginVariants = [ELoginType.email, ELoginType.phone]
const { width } = Dimensions.get('window')
const TAB_WIDTH = width * 0.435

export const LoginForm = () => {
  const { t } = useTranslation()
  const [currentVariant, setCurrentVariant] = useState<ELoginType>(
    ELoginType.email,
  )

  const x = useSharedValue(0)

  const handlePress = (value: ELoginType, index: number) => {
    setCurrentVariant(value)
    x.value = withTiming(index * TAB_WIDTH)
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: 0,
      position: 'absolute',
      width: TAB_WIDTH,
      height: '100%',
      backgroundColor: EColors.white,
      borderRadius: 8,
      transform: [{ translateX: x.value }],
    }
  })

  const renderLoginVariant = (item: ELoginType, index: number) => {
    return (
      <VariantItem onPress={() => handlePress(item, index)} key={item}>
        <LRegular color={EColors.grey_600}>
          {t(`login_variant.${item}`)}
        </LRegular>
      </VariantItem>
    )
  }

  const LoginFields = {
    [ELoginType.email]: LoginEmail,
    [ELoginType.phone]: LoginPhone,
  }

  const LoginComponents = LoginFields[currentVariant]

  return (
    <FlexWrapper mBottom={'20px'} flexDirection={'column'}>
      <VariantContainer>
        <FlexWrapper>
          <Animated.View style={animatedStyle} />
          {loginVariants.map(renderLoginVariant)}
        </FlexWrapper>
      </VariantContainer>

      <LoginComponents />
    </FlexWrapper>
  )
}
