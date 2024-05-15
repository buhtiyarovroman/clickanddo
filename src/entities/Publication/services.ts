import { TResponse } from '@/app/store/types'
import {
  TGetPublicationByIdRequest,
  TGetPublicationRequest,
  TPatchPublicationByIdRequest,
  TPostPublicationRequest,
  TPostPublicationPayload,
  TPatchPublicationPayload,
  TPostPublicationRateRequest,
  TPostPublicationSeenRequest,
} from './models'
import { apiPrivate } from '@/features/api'
import { generateFormData } from '@/app/store/tools'
import { TPatchPublicationPhoto } from './models/patchPublicationPhotos'
import { TGetPublicationComments } from './models/getPublicationComments'
import { TPostPublicationComment } from './models/postPublicationComment'

const path = '/user/publication'

export class PublicationService {
  //Get Publication
  static async getPublication(
    params: TGetPublicationRequest['payload'],
  ): TResponse<TGetPublicationRequest['response']> {
    return apiPrivate.get(`${path}`, { params })
  }

  //Post Publication
  static async postPublication(
    data: TPostPublicationPayload,
  ): TResponse<TPostPublicationRequest['response']> {
    return apiPrivate.post(`${path}`, data)
  }

  //Get Publication by id
  static async getPublicationById({
    id,
    ...params
  }: TGetPublicationByIdRequest['payload']): TResponse<
    TGetPublicationByIdRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}`, { params })
  }

  //Post Publication seen
  static async postPublicationSeen({
    id,
  }: TPostPublicationSeenRequest['payload']): TResponse<
    TPostPublicationSeenRequest['response']
  > {
    return apiPrivate.post(`${path}/${id}/view`)
  }
  //Patch Publication by id
  static async patchPublicationById({
    id,
    ...data
  }: TPatchPublicationPayload): TResponse<
    TPatchPublicationByIdRequest['response']
  > {
    return apiPrivate.patch(`${path}/${id}`, data)
  }

  //Delete Publication by id
  static async deletePublicationById({
    id,
    ...params
  }: TGetPublicationByIdRequest['payload']): TResponse<
    TGetPublicationByIdRequest['response']
  > {
    return apiPrivate.delete(`${path}/${id}`, { params })
  }

  static async patchPublicationPhotos({
    id,
    ...params
  }: TPatchPublicationPhoto['payload']): TResponse<
    TPatchPublicationPhoto['response']
  > {
    const formData = generateFormData(params, ['images'])

    return apiPrivate.patch(`${path}/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  static async getPublicationComments(
    params: TGetPublicationComments['payload'],
  ): TResponse<TGetPublicationComments['response']> {
    return apiPrivate.get('/user/comment', { params })
  }

  static async postPublicationRate({
    id,
    ...data
  }: TPostPublicationRateRequest['payload']): TResponse<
    TPostPublicationRateRequest['response']
  > {
    return apiPrivate.post(path + `/${id}/rate`, data)
  }

  static async postPublicationComment(
    data: TPostPublicationComment['payload'],
  ): TResponse<TPostPublicationComment['response']> {
    console.log('data comment =>', data)
    return apiPrivate.post('/user/comment', data)
  }
}
