import { images } from '@/shared/config'
import { Sentry } from '@/shared/lib'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import i18next from 'i18next'

export const generateLink = async (
  id: string,
  title: string,
  image: string,
) => {
  try {
    const link = await dynamicLinks().buildShortLink(
      {
        link: `https://clickndo.page.link/publication?type=publication&id=${id}`,
        domainUriPrefix: 'https://clickndo.page.link',

        android: {
          packageName: 'com.kitglobal.clickndo',
        },
        ios: {
          appStoreId: '6472716592',
          bundleId: 'com.kitglobal.clickndo',
        },
        social: {
          title,
          descriptionText: title,
          imageUrl: images.publication + image,
        },
        otherPlatform: {
          fallbackUrl: `https://elem.az/catalog/product`,
        },
      },
      dynamicLinks.ShortLinkType.DEFAULT,
    )
    return link
  } catch (e) {
    Sentry.captureException(e)
    console.log('Generating vote link error:', e)
  }
}
