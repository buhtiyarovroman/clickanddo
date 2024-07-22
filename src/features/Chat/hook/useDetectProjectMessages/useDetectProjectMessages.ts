import { useState } from 'react'

import { TuseDetectProjectMessagesProps } from './types'
import { ChatEntities } from '@/entities/Chat'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import _ from 'lodash'
import { TChat } from '@/entities/Chat/models'

export const useDetectProjectMessages = ({
  project,
}: TuseDetectProjectMessagesProps) => {
  const { user } = useTypedSelector(getUserSelector)

  const [projectChat, setProjectChat] = useState<TChat[]>([])

  const getCount = _.debounce(async () => {
    try {
      console.log('getCount rendrequest', project)
      const isProject = !!project

      const { data } = await ChatEntities.ChatService.getChat({
        skip: 0,
        limit: 10,
        members: [user?._id || ''],
        sortBy: 'lastMessageDate',
        order: -1,
        project,
        isProject: isProject,
      })

      setProjectChat(data.docs)
    } catch (err) {
      console.error('getCount err =>', err)
    }
  }, 200)

  return {
    projectChat,
    getCount,
  }
}
