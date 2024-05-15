import { EScreens } from '@/app/navigation'
import { RegisterVariant } from '@/entities'
import { EUserRole } from '@/entities/User/models'
import { useNavigation } from '@/features/hooks'
import { Icon } from '@/shared/ui/Icon'
import { FlexWrapper, H1SemiBold } from '@/shared/ui/Styled/Styled'
import { Background } from '@/shared/ui/background'
import { Png } from '@assets/Png'
import React from 'react'

import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native'
import { styles } from './styled'
import { AuthFeatures } from '@/features/Auth'
import { useDispatch } from 'react-redux'
import { userActions } from '@/entities/User'

export const Main = () => {
  const { t } = useTranslation()
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const onRegisterExecutor = () => {
    navigate(EScreens.RegisterSecond, { type: EUserRole.specialist })
  }

  const onRegisterCustomer = () => {
    navigate(EScreens.RegisterSecond, { type: EUserRole.customer })
  }

  const onPressBack = async () => {
    await AuthFeatures.Firebase.signOut()
    dispatch(userActions.clearState())
    navigate(EScreens.AuthMain)
  }

  return (
    <Background.SafeArea edges={['top', 'bottom']} pHorizontal={20}>
      <FlexWrapper justify={'flex-start'}>
        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={onPressBack}
          style={styles.touch}>
          <Icon name={'Back'} size={24} />
        </TouchableOpacity> */}
        <H1SemiBold mLeft={'10px'} mBottom={'16px'} mTop={'16px'}>
          {t('registration')}
        </H1SemiBold>
      </FlexWrapper>

      <RegisterVariant
        image={Png.CustomerReg}
        title={t('register_variant.customer.title')}
        description={t('register_variant.customer.description')}
        onPress={onRegisterCustomer}
      />

      <RegisterVariant
        image={Png.ExecutorReg}
        title={t('register_variant.executor.title')}
        description={t('register_variant.executor.description')}
        onPress={onRegisterExecutor}
      />
    </Background.SafeArea>
  )
}
