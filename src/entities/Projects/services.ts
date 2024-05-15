import { TPatchProject } from './models/patchProject'
import { TResponse } from '@/app/store/types'

import { apiPrivate } from '@/features/api'
import {
  TGetProjectsRequest,
  TPostProjectRequest,
  TGetProjectByIdRequest,
  TPostProjectResponseRequest,
  TPatchProjectPhotoRequest,
  TPostProjectApproveRequest,
  TPatchProjectStatusRequest,
  TPostProjectViewRequest,
  TGetProjectResponsesRequest,
} from './models'
import { generateFormData } from '@/app/store/tools'
import { TReportProject } from './models/reportProject'

const path = '/user/project'

export class ProjectsService {
  //Get All Projects
  static async getProjects(
    params: TGetProjectsRequest['payload'],
  ): TResponse<TGetProjectsRequest['response']> {
    return apiPrivate.get(`${path}`, { params })
  }

  static async postProject(
    data: TPostProjectRequest['payload'],
  ): TResponse<TPostProjectRequest['response']> {
    return apiPrivate.post(`${path}`, data)
  }

  static async patchProject({
    id,
    data,
  }: TPatchProject['payload']): TResponse<TPatchProject['response']> {
    return apiPrivate.patch(`${path}/${id}`, data)
  }

  static async patchProjectImage({
    id,
    ...props
  }: TPatchProjectPhotoRequest['payload']): TResponse<
    TPatchProjectPhotoRequest['response']
  > {
    const formData = generateFormData(props, ['images'])

    return apiPrivate.patch(`${path}/${id}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  //Get  Project
  static async getProjectById({
    id,
    ...params
  }: TGetProjectByIdRequest['payload']): TResponse<
    TGetProjectByIdRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}`, { params })
  }

  static async getProjectResponses({
    id,
    ...params
  }: TGetProjectResponsesRequest['payload']): TResponse<
    TGetProjectResponsesRequest['response']
  > {
    return apiPrivate.get(`${path}/${id}/response`, { params })
  }

  //post  Project response
  static async postProjectResponse({
    id,
    ...data
  }: TPostProjectResponseRequest['payload']): TResponse<
    TPostProjectResponseRequest['response']
  > {
    return apiPrivate.post(`${path}/${id}/response`, data)
  }

  //post Project approve
  static async postProjectApprove({
    id,
    ...data
  }: TPostProjectApproveRequest['payload']): TResponse<
    TPostProjectApproveRequest['response']
  > {
    return apiPrivate.post(`${path}/${id}/response/approve`, data)
  }

  //patch Project status
  static async patchProjectStatus({
    id,
    ...data
  }: TPatchProjectStatusRequest['payload']): TResponse<
    TPatchProjectStatusRequest['response']
  > {
    return apiPrivate.patch(`${path}/${id}/status`, data)
  }

  static async deleteProject(id: string) {
    return apiPrivate.delete(`${path}/${id}`)
  }

  static async reportProject({
    projectId,
    reportText,
  }: TReportProject['payload']): TResponse<TReportProject['response']> {
    return apiPrivate.post('/user/report', {
      to: projectId,
      reason: reportText,
    })
  }

  static async postViewProject({
    id,
  }: TPostProjectViewRequest['payload']): TResponse<
    TPostProjectViewRequest['response']
  > {
    return apiPrivate.post(`${path}/${id}/view`)
  }
}
