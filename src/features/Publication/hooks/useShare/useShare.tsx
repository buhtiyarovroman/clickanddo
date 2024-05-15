import { TUseShareProps } from './types'
import { useTranslation } from 'react-i18next'
import { Platform } from 'react-native'
import { convertFile } from './convertFile'
import Share from 'react-native-share'
import RNFetchBlob from 'rn-fetch-blob'
import { format } from 'date-fns'
import { generateLink } from './helper'

export const useShare = ({ publication }: TUseShareProps) => {
  const { t } = useTranslation()
  const shareMessage = async () => {
    if (!publication) {
      return '-'
    }

    let title = `\n\n${publication.heading}`

    let description = `\n\n${publication.description}`

    let deadline =
      publication.type === 'special-offer' && publication.relevantUntil
        ? `\n\n${t('offer_deadline')}: ${format(
            new Date(publication.relevantUntil),
            'dd MMM yyyy',
          )}`
        : ''

    let priceRange =
      publication.type === 'special-offer' &&
      publication?.minPrice &&
      publication?.maxPrice
        ? `\n\n${t('price_range')}: ${publication?.minPrice} ${
            publication.currency
          } - ${publication.maxPrice} ${publication.currency}`
        : ''

    let percent =
      publication.price !== publication.oldPrice
        ? ((publication.price / publication.oldPrice) * 100).toString()
        : undefined

    let price =
      publication.type === 'skillbox'
        ? `\n\n${t('price')}: ${publication.price.toFixed(2)} ${
            publication.currency
          }`
        : ''

    let priceBeforeDiscount =
      publication.type === 'skillbox' && percent
        ? `\n${t('price_without_discount')}: ${publication.oldPrice} ${
            publication.currency
          }`
        : ''

    let percentStr =
      publication.type === 'skillbox' && percent
        ? `\n${t('discount_percentage')}: ${percent}%`
        : ''

    const link = await generateLink(
      publication._id,
      publication.heading,
      publication.images[0],
    )

    return `ClickNDo:${title}${description}${deadline}${priceRange}${price}${priceBeforeDiscount}${percentStr}\n\n${link}`
  }

  const shareImageIOS = async () => {
    if (!publication) return
    const image = await convertFile(publication.images)
    const message = await shareMessage()

    Share.open({
      url: image,
      title: publication.heading,
      message,
      filename: RNFetchBlob.fs.dirs.DocumentDir + '/tmp.png',
    })
      .then(() => {})
      .catch(err => {
        err && console.log('share, error', err)
      })
  }

  const shareImageAndroid = async () => {
    if (!publication) return
    const image = await convertFile(publication.images)

    const message = await shareMessage()

    await Share.open({
      url: image ?? '',
      title: publication.heading,
      message,
    })
  }
  const onShare = () => {
    if (Platform.OS === 'ios') {
      shareImageIOS()
      return
    }

    shareImageAndroid()
  }

  return { onShare }
}
