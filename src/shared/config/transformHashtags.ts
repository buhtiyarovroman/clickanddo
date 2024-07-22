import { THashTag, TSearchHashTag } from '@/entities/User/models'

export const transformHashtags = (data: TSearchHashTag[]): THashTag[] =>
  data.map(item => ({
    title: item._source.title,
    interest: item._source.interest,
    status: item._source.status,
    __v: item._source.__v,
    category: item._source.category,
    createdAt: item._source.createdAt,
    _id: item._source.oid,
    updatedAt: item._source.updatedAt,
  }))
