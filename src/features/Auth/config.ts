export const AUTH_PROVIDERS_CONFIG = {
  email: {
    actionCodeSettings: {
      handleCodeInApp: true,

      iOS: {
        bundleId: 'com.kitglobal.clickndo',
      },
      android: {
        packageName: 'com.kitglobal.clickndo',
      },
      url: 'https://clickndo.page.link/verifyEmail',
    },
  },
}

// https://liversiapp.page.link/emailVerify
