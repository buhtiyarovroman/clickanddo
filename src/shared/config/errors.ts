export const firebaseErrors: Record<string, string> = {
  'auth/app-not-authorized':
    'This application, identified by the domain where it is hosted, is not authorized to use Firebase Authentication with the provided API key.',

  'auth/app-not-installed':
    'The requested mobile app corresponding to the identifier (Android package name or iOS package ID) provided is not installed on this device.',

  'auth/cordova-not-ready': 'The Cordova framework is not ready.',

  'auth/cors-unsupported': 'This browser is not supported.',

  'auth/credential-already-in-use':
    'This credential is already associated with a different user account.',

  'auth/custom-token-mismatch':
    'The custom token corresponds to a different audience.',

  'auth/requires-recent-login':
    'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',

  'auth/dynamic-link-not-activated':
    'Enable dynamic links in firebase console and agree to terms and conditions.',

  'auth/email-already-in-use':
    'The email address is already in use by another account.',

  'auth/expired-action-code': 'The action code has expired.',

  'auth/cancelled-popup-request':
    'This operation was canceled due to another conflicting popup being opened.',

  'auth/internal-error': 'An internal error has occurred.',

  'auth/invalid-app-id':
    'The mobile app identifier is not registered for the current project.',

  'auth/invalid-user-token':
    "The user's credential is no longer valid. You must sign in again.",

  'auth/invalid-auth-event': 'An internal error has occurred.',

  'auth/invalid-verification-code':
    'The verification SMS code used to create the authorization credential is invalid. Please resubmit the code and be sure to use the code provided by the user.',

  'auth/invalid-cordova-configuration':
    'The following Cordova plugins must be installed to enable OAuth sign-in.',

  'auth/invalid-custom-token':
    'The custom token format is incorrect. Please check the documentation.',

  'auth/invalid-email': 'The email address is bad formatted.',

  'auth/invalid-api-key':
    'Your API key is invalid, please make sure you copied it correctly.',

  'auth/invalid-credential':
    'The provided automatic credential is bad formatted or has expired.',

  'auth/invalid-message-payload':
    'The email template corresponding to this action contains invalid characters in your message. Please fix it for the Auth email templates section in the Firebase Console.',

  'auth/invalid-oauth-provider':
    'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',

  'auth/unauthorized-domain':
    'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains in the Firebase console.',

  'auth/invalid-action-code':
    'Action code is invalid. This can happen if the code is malformed, expires or has already been used.',

  'auth/wrong-password':
    'The password is invalid or the user does not have a password.',

  'auth/invalid-recipient-email':
    'The email corresponding to this action did not send as the recipient email address provided is invalid.',

  'auth/invalid-sender':
    'The email template corresponding to this action contains an invalid sender email or name. Please fix this by going to the Auth email templates section in the Firebase Console.',

  'auth/invalid-verification-id':
    'Verifier ID used to create authorization credential is invalid.',

  'auth/missing-iframe-start': 'An internal error has occurred.',

  'auth/auth-domain-config-required':
    'Be sure to include authDomain when calling Firebase. initializeApp(), following the instructions in the Firebase console.',

  'auth/missing-app-credential':
    'The phone verification request is missing an app verifier claim. A reCAPTCHA response token needs to be provided.',

  'auth/missing-verification-code':
    "The phone's authentication credential was created with an empty SMS verification code.",
  'auth/missing-verification-id':
    "The phone's authentication credential was created with an empty verification ID.",

  'auth/app-deleted': 'This FirebaseApp instance has been deleted.',

  'auth/account-exists-with-different-credential':
    'An account already exists with the same email address but different login credentials.',

  'auth/network-request-failed':
    'A network error has occurred (such as timeout, connection broken, or host unreachable).',

  'auth/no-auth-event': 'An internal error has occurred.',

  'auth/no-such-provider':
    'User has not been linked to an account with the provided provider.',

  'auth/operation-not-allowed':
    'Provided provider is disabled for this Firebase project. Enable it in the Firebase console, in the login method tab of the Auth section.',

  'auth/operation-not-supported-in-this-environment':
    'This operation is not supported in the environment in which this application is running. The "location.protocol" must be http, https or chrome-extension and web storage must be enabled.',

  'auth/popup-blocked':
    'Unable to establish a connection to the popup. It may have been blocked by the browser.',

  'auth/popup-closed-by-user':
    'The popup was closed by the user before completing the operation.',

  'auth/provider-already-linked':
    'The user can only be bound to one identity for the given provider.',

  'auth/quota-exceeded": ':
    'The project quota for this operation has been exceeded.',

  'auth/redirect-cancelled-by-user':
    'The redirect operation was canceled by the user before ending.',

  'auth/redirect-operation-pending':
    'The login redirect operation is already pending.',

  'auth/timeout': 'The operation has expired',

  'auth/user-token-expired':
    "The user's credential is no longer valid. The user must login again.",

  'auth/too-many-requests':
    'We block all requests from this device due to unusual activity. Try again later.',

  'auth/user-cancelled':
    'The user did not grant your request the permissions you requested.',

  'auth/user-not-found':
    'There is no user record corresponding to this identifier. The user may have been deleted.',

  'auth/user-disabled':
    'The user account has been disabled by an administrator.',

  'auth/user-mismatch':
    'The credentials provided do not correspond to the previously registered user.',

  'auth/user-signed-out': 'User logged out.',

  'auth/weak-password': 'The password must be 6 characters or more.',

  'auth/web-storage-unsupported':
    'This browser is not supported or third-party cookies and data may be disabled.',

  'auth/captcha-check-failed':
    'The reCAPTCHA response token is invalid, expired, already in use, or the domain associated with it does not match the list of authorized domains.',

  'auth/code-expired':
    'The SMS code has expired. Please resend the verification code to try again.',

  'auth/invalid-app-credential':
    'The phone verification request contains an invalid verification application. The reCAPTCHA response token is invalid or expired.',
}
