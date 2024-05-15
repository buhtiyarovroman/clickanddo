import auth, { firebase, FirebaseAuthTypes } from '@react-native-firebase/auth'
import appleAuth from '@invertase/react-native-apple-authentication'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { FIREBASE_IOS_CLIENT_ID, FIREBASE_WEB_CLIENT_ID } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Sentry } from '@/shared/lib'
import { AUTH_PROVIDERS_CONFIG } from './config'
import { firebaseErrors } from './errors'
import Toast from 'react-native-toast-message'
import { EToastType } from '@/app/contexts/Toast/types'

GoogleSignin.configure({
  iosClientId: FIREBASE_IOS_CLIENT_ID,
  webClientId: FIREBASE_WEB_CLIENT_ID,
  scopes: ['https://www.googleapis.com/auth/userinfo.profile', 'openid'],
})

type Link = {
  url: string
}

class Firebase {
  private auth
  private confirmation: FirebaseAuthTypes.ConfirmationResult | undefined
  private snapshot: Promise<FirebaseAuthTypes.PhoneAuthSnapshot> | undefined
  private unsubscribeInstance:
    | ReturnType<typeof this.auth.onAuthStateChanged>
    | undefined

  constructor() {
    this.auth = auth()
  }

  // Auth state changed
  public unsubscribe() {
    this.unsubscribeInstance && this.unsubscribeInstance()
  }

  public async afterSignInWithEmail(link: string) {
    try {
      const email = await AsyncStorage.getItem('EMAIL_FOR_SIGN_IN')

      await this.auth.signInWithEmailLink(email!, link)
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  public isSignInWithEmailLink(link: string) {
    return this.auth.isSignInWithEmailLink(link)
  }

  public async signInWithEmail(email: string) {
    await AsyncStorage.setItem('EMAIL_FOR_SIGN_IN', email)

    await this.auth.sendSignInLinkToEmail(
      email,
      AUTH_PROVIDERS_CONFIG.email?.actionCodeSettings,
    )
  }
  public async getAccessToken(newToken?: boolean) {
    let token
    try {
      token = await auth().currentUser?.getIdToken(!!newToken)
    } catch (e) {
      console.log('getAccessToken', e)
    }

    return token
  }

  public onIdTokenChanged(callback: () => void) {
    return this.auth.onIdTokenChanged(async user => {
      if (user) {
        callback()
      }
    })
  }

  // Google login
  public async signInWithGoogle() {
    await GoogleSignin.hasPlayServices()

    const { idToken } = await GoogleSignin.signIn()

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Refresh token
    return auth().signInWithCredential(googleCredential)
  }

  public async signInWithApple() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned')
    }

    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    )

    return auth().signInWithCredential(appleCredential)
  }

  // sign in with phone
  public async signInWithPhone(
    phoneNumber: string,
    resend: boolean | undefined = false,
  ) {
    try {
      const codeConfirm = await auth().signInWithPhoneNumber(
        phoneNumber,
        resend,
      )
      this.confirmation = codeConfirm
    } catch (e) {
      console.log('phone err', e)
      this.validateError(e)
    }
  }

  //  confirm verirfication code
  public async confirmCode(code: string) {
    if (!this.confirmation) throw Error('Nothing to confirm')

    return this.confirmation?.confirm(code)
  }

  // Verify phone number
  public async verifyPhoneNumber(
    phone: string,
    callback: (verificationId: FirebaseAuthTypes.PhoneAuthSnapshot) => void,
  ) {
    this.snapshot = auth()
      .verifyPhoneNumber(phone)
      .on('state_changed', snapshot => {
        callback(snapshot)
      })
      .then(snapshot => {
        console.log('fine')
        callback(snapshot)
        return snapshot
      })
      .catch(err => {
        console.error(err)
        Sentry.captureException('verifyPhoneNumber =>', err)
      })
  }

  // Link phone number
  public async linkPhoneNumber(code: string) {
    if (!this.snapshot) throw Error('Nothing to confirm')

    const { verificationId } = await this.snapshot
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code,
    )

    return auth().currentUser?.updatePhoneNumber(credential)
  }

  // Unlink phone number
  public async unlinkUserPhone() {
    return auth().currentUser?.unlink(
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    )
  }

  // Get current user
  public getUser() {
    const user = this.auth?.currentUser
    return user
  }

  // Sign out user
  public async signOut() {
    await this.auth.signOut()
  }

  // signInWithCustomToken
  public async signInWithCustomToken(customToken: string) {
    try {
      const token = await auth().signInWithCustomToken(customToken)

      return !!token
    } catch (err) {
      console.log('signInWithCustomToken error =>', err)
      Sentry.captureException(err)
    }
  }

  public async validateError(error: unknown) {
    console.log(error)
    const err = error as { code?: string; message?: string }

    if (err.code) {
      Sentry.captureException(error)
      const existError = firebaseErrors[err.code]

      console.log('existError: ', existError)

      if (existError) {
        Toast.show({
          type: EToastType.error,
          text2: `firebase_error.${err.code}`,
        })
      }
    }
  }
}

export default new Firebase()
