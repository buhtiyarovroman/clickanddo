import { TGetInterests } from './models/getInterests'
import { TResponse } from '@/app/store/types'
import axios from 'axios'
import {
  TDeleteUserMeRequest,
  TGetAllUsersRequest,
  TGetGeneralUserInfoRequest,
  TGetGooglePlaceRequest,
  TGetHashtagByIdRequest,
  TGetHashtagRequest,
  TGetUserByIdRequest,
  TGetUserMeRequest,
  TPatchGeneralUserInfoRequest,
  TPatchUserMePhotoRequest,
  TPatchUserRequest,
  TPatchUserVerificationRequest,
  TPostCheckCredRequest,
  TPostGeneralUserInfoRequest,
  TPostReviewRequest,
  TGetUserReviewsRequest,
  TPostHashtagRequest,
  TGetGoogleGeometryRequest,
} from './models'
import i18next from 'i18next'
import { apiPrivate } from '@/features/api'
import { GOOGLE_API_KEY } from '@env'
import { TPostUserRequest } from './models/postUser'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { generateFormData } from '@/app/store/tools'
import { TGetUserProjects } from './models/getUserProject'

const path = '/user/user'
const pathReview = '/user/review'

const pathGeneral = '/user/general-profile/me'

const userId = 'userId'

export class UserService {
  //Get User Me
  static async getAllUsers(
    params: TGetAllUsersRequest['payload'],
  ): TResponse<TGetAllUsersRequest['response']> {
    return apiPrivate.get(`${path}`, { params })
  }

  //Get User Me
  static async getUserMe({}: TGetUserMeRequest['payload']): TResponse<
    TGetUserMeRequest['response']
  > {
    return apiPrivate.get(`${path}/me`)
  }

  //Get User by Id
  static async getUserById({
    id,
  }: TGetUserByIdRequest['payload']): TResponse<
    TGetUserByIdRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}`)
  }

  //Post User Me
  static async postUser(
    data: TPostUserRequest['payload'],
  ): TResponse<TPostUserRequest['response']> {
    return apiPrivate.post(`${path}/me`, data)
  }

  //Path User Me
  static async pathUser(
    data: TPatchUserRequest['payload'],
  ): TResponse<TPatchUserRequest['response']> {
    return apiPrivate.patch(`${path}/me`, data)
  }

  //Path User Me Photo
  static async pathUserMePhoto(
    data: TPatchUserMePhotoRequest['payload'],
  ): TResponse<TPatchUserMePhotoRequest['response']> {
    console.log('data =>', data)
    const formData = generateFormData(data, ['photo'])

    console.log('formData =>', formData)

    return apiPrivate.patch(`${path}/me/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  //Get City
  static async getGoogleCity({
    input,
  }: TGetGooglePlaceRequest['payload']): TResponse<
    TGetGooglePlaceRequest['response']
  > {
    return axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&fields=geometry&language=${i18next.language}&key=${GOOGLE_API_KEY}`,
    )
  }

  //Get City
  static async getGoogleGeometry({
    place_id,
  }: TGetGoogleGeometryRequest['payload']): TResponse<
    TGetGoogleGeometryRequest['response']
  > {
    return axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=geometry&key=${GOOGLE_API_KEY}`,
    )
  }

  // set Token
  static async setUserId(id: string) {
    await AsyncStorage.setItem(userId, id)
  }

  // get Token
  static async getUserId() {
    return AsyncStorage.getItem(userId)
  }

  // get Token
  static async deleteUserId() {
    AsyncStorage.removeItem(userId)
  }

  //Path User Me Photo
  static async deleteUserMe({}: TDeleteUserMeRequest['payload']): TResponse<
    TDeleteUserMeRequest['response']
  > {
    return apiPrivate.delete(`${path}/me`)
  }

  //Path User Verification
  static async patchUserVerification(
    data: TPatchUserVerificationRequest['payload'],
  ): TResponse<TPatchUserVerificationRequest['response']> {
    const formData = generateFormData(data, ['photo'])
    return apiPrivate.patch(`${path}/me/verification`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  //Get hashtag
  static async getHashtag(
    params: TGetHashtagRequest['payload'],
  ): TResponse<TGetHashtagRequest['response']> {
    return apiPrivate.get(`/user/hashtag/search`, { params })
  }

  //Get hashtag by id
  static async getHashtagById({
    id,
  }: TGetHashtagByIdRequest['payload']): TResponse<
    TGetHashtagByIdRequest['response']
  > {
    return apiPrivate.get(`/user/hashtag/${id}`)
  }

  //post hashtag
  static async postHashtag(
    data: TPostHashtagRequest['payload'],
  ): TResponse<TPostHashtagRequest['response']> {
    return apiPrivate.post(`/user/hashtag`, data)
  }

  static async getInterests(
    params: TGetInterests['payload'],
  ): TResponse<TGetInterests['response']> {
    return apiPrivate.get(`/user/interest`, { params })
  }

  static async getUserReviews(
    params: TGetUserReviewsRequest['payload'],
  ): TResponse<TGetUserReviewsRequest['response']> {
    return apiPrivate.get('/user/review', {
      params,
    })
  }
  static async getUserProjects(
    params: TGetUserProjects['payload'],
  ): TResponse<TGetUserProjects['response']> {
    return apiPrivate.get('/user/project', { params })
  }

  static async getGeneralUserInfo(
    params: TGetGeneralUserInfoRequest['payload'],
  ): TResponse<TGetGeneralUserInfoRequest['response']> {
    return apiPrivate.get(`${pathGeneral}`, { params })
  }

  static async postGeneralUserInfo(
    data: TPostGeneralUserInfoRequest['payload'],
  ): TResponse<TPostGeneralUserInfoRequest['response']> {
    return apiPrivate.post(`${pathGeneral}`, data)
  }

  static async patchGeneralUserInfo(
    data: TPatchGeneralUserInfoRequest['payload'],
  ): TResponse<TPatchGeneralUserInfoRequest['response']> {
    return apiPrivate.patch(`${pathGeneral}`, data)
  }

  static async postCheckCred(
    data: TPostCheckCredRequest['payload'],
  ): TResponse<TPostCheckCredRequest['response']> {
    return apiPrivate.post(`${path}/check-credentials`, data)
  }

  static async postReview(
    data: TPostReviewRequest['payload'],
  ): TResponse<TPostReviewRequest['response']> {
    return apiPrivate.post(`${pathReview}`, data)
  }
}
