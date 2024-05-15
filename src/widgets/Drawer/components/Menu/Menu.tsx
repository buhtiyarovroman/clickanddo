import React, { useRef } from 'react'
import { View } from 'react-native'
import { buttonData } from './data'
import { TDrawerButtonData } from './types'
import { DrawerButton } from '../DrawerButton'
import { useDispatch } from 'react-redux'
import { userActions } from '@/entities/User'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@/features/hooks'
import { CommonActions } from '@react-navigation/native'
import { EStacks } from '@/app/navigation'
import { TStandardModalRef } from '@/shared/ui/modals/Standard/types'
import { Modal } from '@/shared/ui/modals'
import { EDrawerStackScreens } from '@/app/navigation/drawer/types'
import { chatActions } from '@/entities/Chat/store'
import { useTranslation } from 'react-i18next'

export const Menu = () => {
  const { t } = useTranslation()
  const { dispatch: navigateDispatch, navigate } = useNavigation()
  const dispatch = useDispatch()
  const modalRef = useRef<TStandardModalRef | null>(null)
  const exitModalRef = useRef<TStandardModalRef | null>(null)

  const onLogout = async () => {
    dispatch(userActions.logout())
    dispatch(chatActions.clearState())

    await auth().signOut()

    navigateDispatch(
      CommonActions.reset({
        routes: [{ name: EStacks.Auth }],
        index: 0,
      }),
    )
  }

  const onPressLink = async (item: TDrawerButtonData) => {
    switch (item.text) {
      case 'logout':
        exitModalRef.current?.open()

        break

      case 'profile':
        navigate(EDrawerStackScreens.ProfileStack)
        break

      case 'personal_data':
        navigate(EDrawerStackScreens.PersonalDataStack)
        break

      case 'settings':
        navigate(EDrawerStackScreens.Settings)
        break

      // TODO - Navigation for help_and_support and payment_data
      // case 'help_and_support':
      //   navigate(EDrawerStackScreens.Support)
      //   break
      // case 'payment_data':
      //   navigate(EDrawerStackScreens.PaymentData)
      //   break

      default:
        modalRef.current?.open()
    }
  }

  const renderItem = (item: TDrawerButtonData, index: number) => (
    <DrawerButton key={index} onPress={() => onPressLink(item)} {...item} />
  )

  return (
    <>
      <View>{buttonData.map(renderItem)}</View>
      <Modal.ComingSoon ref={modalRef} />
      <Modal.AcceptModal
        ref={exitModalRef}
        onPressAgree={onLogout}
        title={t('agree_logout')}
      />
    </>
  )
}
