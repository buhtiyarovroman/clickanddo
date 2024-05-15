import { TPublication } from '@/entities/Publication/models'
import { TCreatePublication } from '@/entities/Publication/store/types'
import { TCreateSkillBoxData } from '@/entities/Skillbox/store/types'
import { TCreateSpecialOfferData } from '@/entities/SpecialOffer/store/types'

export const formatDataCreateSpecialOffer = (
  data: TPublication,
): TCreateSpecialOfferData => ({
  id: data._id,
  title: data.heading,
  hashtag: data.hashtag,
  priceFrom: data.minPrice,
  priceTo: data.maxPrice,
  duration: data.duration + '',
  expirationDate: new Date(data.relevantUntil),
  photos: data.images,
  description: data.description,
  currency: data.currency,
  hideLikes: data.hideLikes,
  imageHeight: data.imageHeight,
  imageWidth: data.imageWidth,
})

export const formatDataCreatePublication = (
  data: TPublication,
): TCreatePublication => ({
  id: data._id,
  images: data.images,
  location: data.address,
  title: data.heading,
  description: data.description,
  price: data.price + '',
  currency: data.currency,
  hideLikes: data.hideLikes,
  coordinates: data?.location?.coordinates || [],
  hashtag: data.hashtag,
})

export const formatDataCreateSkillBox = (
  data: TPublication,
): TCreateSkillBoxData => {
  const discount =
    data.price !== data.oldPrice
      ? ((data.price / data.oldPrice) * 100).toString()
      : undefined

  return {
    id: data._id,
    title: data.heading,
    category: {
      title: data.category.title,
      _id: data.category._id,
    },
    interest: {
      title: data.subcategory.title,
      _id: data.subcategory._id,
    },
    hashtag: data.hashtag,
    initialPrice: Math.round(data.oldPrice),
    discount: discount,
    priceAfterDiscount: Math.round(data.price),
    duration: data.duration + '',
    expirationDate: new Date(data.relevantUntil),
    photos: data.images,
    description: data.description,
    currency: data.currency,
    location: data.location.coordinates || [],
    locationRange: data.range + '',
    address: data.address,
    imageHeight: data.imageHeight,
    imageWidth: data.imageWidth,
    hideLikes: data.hideLikes,
  }
}
