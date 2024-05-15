import { AxiosResponse } from 'axios'
import rootReducer from './reducer'
import { ELanguages } from '../i18n'

export type TRootState = ReturnType<typeof rootReducer>

export type TStatus = {
  code: string
  message: string
}

export type TSetStatePayload<TInitialState = {}> = Partial<TInitialState>

export enum EStoreReducer {
  user = 'user',
  publication = 'publication',
  categories = 'categories',
  projects = 'projects',
  specialOffer = 'specialOffer',
  skillBox = 'skillBox',
  chat = 'chat',
  favorites = 'favorites',
  notifications = 'notifications',
}

export type TSagaResponse<Res = unknown> = AxiosResponse<Res>

export type TResponse<Response = unknown, Config = unknown> = Promise<
  AxiosResponse<Response, Config>
>

export type TDefaultQueryParams = {
  limit?: number
  page?: number
  sortBy?: string
  order?: number
} & TDefaultLangProps

export type TRequest<TPayload, TRes> = {
  payload: TPayload
  response: TRes
}

export type TResponseDataMeta<Data, Meta = TDefaultMeta> = {
  data: Data
  meta: Meta
}

export type TResponseData<Data> = {
  data: Data
}

export type TDefaultMeta = {
  totalCount: number
}

export type TDefaultLangProps = {
  lang?: `${ELanguages}`
}

export type TResponseDocs<Data> = {
  docs: Data
  totalCount: number
}

export type TResponseDocsWithFilter<Data, Filter> = {
  docs: Data
  totalCount: number
  filterData: Filter
}
