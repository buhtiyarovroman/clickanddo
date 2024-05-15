import { TCategory, TTranslateValue } from '@/entities/Category/models'

export type TUser = {
  _id: string
  name: string
  secondName: string
  fatherName: string
  photo: string
  country: string
  phone: string
  email: string
  status: `${TUserVerificationStatus}`
  dateOfBirth: string
  login: string
  gender: string
  firebaseId: string
  role: `${EUserRole}`
  subscribers: number
  likes: number
  dislikes: number
  description: string
  languages: TUserLanguage[]
  education: TUserEducation[]
  work: TUserWork[]
  anotherExperience: TAnotherExperience[]
  skills: string[]
  lang: string
  location: TUserLocation
  online: boolean
  verificationInfo: {}
  activeProjects: number
  hashtag: THashTag[]
  about: string
  rating?: number
  totalVotes?: number
  totalProjects?: number
  category?: TCategory
}

export enum TUserVerificationStatus {
  unverified = 'unverified',
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected',
}

export type TUserEducation = {
  name: string
  from: string
  to?: string
  discipline: string
  location: string
}

export type TUserWork = {
  name: string
  location: string
  // position: string
  from: string
  to?: string
  // description: string
  // positionLocation: string
}

export type TAnotherExperience = {
  name: string
  description: string
}

export type TUserLanguage = {
  lang: string
  level: number
}

export type TUserLocation = {
  type: string
  coordinates: string[]
}

export enum EUserRole {
  customer = 'customer',
  specialist = 'specialist',
}

export type TPredictionPlace = {
  description: string
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
  types: string[]
}

export type TGeometryPlace = {
  geometry: {
    location: {
      lat: number
      lng: number
    }
    viewport: {
      northeast: {
        lat: number
        lng: number
      }
      southwest: {
        lat: number
        lng: number
      }
    }
  }
}

export type THashTag = {
  _id: string
  title: TTranslateValue[]
}

export type THashTagStatus = 'approved' | 'pending'

export type TPostGeneralUser = {
  name?: string
  phone?: string
  email?: string
  location?: string
}

export type TReview = {
  _id: string
  to: string
  owner: TUser
  project: string
  title: string
  description: string
  createdAt: string
  mark: Partial<TMark>
}

export type TMark = {
  price: number
  professionalism: number
  cost: number
  contactability: number
  timing: number
  mark: number
}
