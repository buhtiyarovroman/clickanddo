import { EScreens } from '@/app/navigation'
import { TSpecialOfferCreateSecondParams } from '@/screens/Projects/CreateSecond'
import { TSpecialOfferCreateFirstParams } from '@/screens/List/SpecialOffer/CreateFirst'
import { TSpecialOfferParams } from '@/screens/List/SpecialOffer/Intro'
import { TSpecialOfferCreateThirdParams } from '@/screens/List/SpecialOffer/CreateThird/types'
import { TSpecialOfferCreateFourthParams } from '@/screens/List/SpecialOffer/CreateFourth/types'

export type TSpecialOfferStack = {
  [EScreens.SpecialOfferMain]: TSpecialOfferParams
  [EScreens.SpecialOfferCreateFirst]: TSpecialOfferCreateFirstParams
  [EScreens.SpecialOfferCreateSecond]: TSpecialOfferCreateSecondParams
  [EScreens.SpecialOfferCreateThird]: TSpecialOfferCreateThirdParams
  [EScreens.SpecialOfferCreateFourth]: TSpecialOfferCreateFourthParams
}
