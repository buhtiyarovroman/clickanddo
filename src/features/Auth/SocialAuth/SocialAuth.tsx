import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, SMedium } from '@/shared/ui/Styled/Styled'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, View } from 'react-native'
import { SocialContainer, styles } from './styled'
import { Icon } from '@/shared/ui/Icon'
import { AuthFeatures } from '..'
import { UserEntities } from '@/entities/User'
import { LoaderContext } from '@/app/contexts/Loader'
import { useAuthNavigate } from '@/features/User/hooks/useAuthNavigate'

export const SocialAuth = () => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)

  const { onInitialGetUser } = useAuthNavigate()

  const isIOS = Platform.OS === 'ios'

  // const getUser = async () => {
  //   await UserEntities.UserService.getAllUsers({}).then(res => {
  //     console.log('res.data =>', res.data)

  //     onAuthNavigate(res.data)
  //   })
  // }

  const onGoogleAuth = async () => {
    try {
      setLoading(true)
      await AuthFeatures.Firebase.signInWithGoogle()

      onInitialGetUser()
    } catch (err) {
      console.log('err google auth =>', err)
    } finally {
      setLoading(false)
    }
  }

  const onAppleAuth = async () => {
    try {
      setLoading(true)
      await AuthFeatures.Firebase.signInWithApple()

      onInitialGetUser()
    } catch (err) {
      console.log('err google auth =>', err)
    } finally {
      setLoading(false)
    }
  }
  return (
    <FlexWrapper flexDirection={'column'}>
      <FlexWrapper justify={'space-between'}>
        <View style={styles.line} />
        {/* Title */}
        <SMedium color={EColors.grey_500} mLeft={'10px'} mRight={'10px'}>
          {t('or_sign_in')}
        </SMedium>
        <View style={styles.line} />
      </FlexWrapper>

      <FlexWrapper mTop={'20px'} mBottom={'32px'}>
        {/* Google Button */}
        <SocialContainer onPress={onGoogleAuth}>
          <Icon name={'Google'} size={20} />
        </SocialContainer>

        {/* Apple Button */}
        {isIOS && (
          <SocialContainer onPress={onAppleAuth} mLeft={'16px'} mRight={'16px'}>
            <Icon name={'Apple'} size={20} />
          </SocialContainer>
        )}
      </FlexWrapper>
    </FlexWrapper>
  )
}
