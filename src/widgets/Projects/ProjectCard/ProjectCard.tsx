import { SocketIOContext } from '@/app/contexts/SocketIO'
import { TMessage } from '@/entities/Chat/models'
import { useDetectProjectMessages } from '@/features/Chat'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'
import React, { useCallback, useContext, useEffect } from 'react'
import { ProjectContainer, MessageCountDot } from './styled'
import { TProjectCartProps } from './types'
import { Head, Dates, Content } from './ui'
import { Statuses } from './ui/Statuses'

export const ProjectCard = React.memo(
  ({
    project,
    width = '100%',
    showDates = false,
    showStatus = false,
    needChatDetect = false,
    ...props
  }: TProjectCartProps) => {
    const isFocused = useIsFocused()
    const { ref } = useContext(SocketIOContext)
    const { getCount, projectChat } = useDetectProjectMessages({
      project: project._id,
    })

    const currentChat = projectChat.find(item => item.project === project._id)

    const onGetCount = useCallback(
      _.debounce((chatId: string) => {
        if (isFocused && needChatDetect && currentChat?._id === chatId) {
          getCount()
        }
      }, 100),
      [isFocused, currentChat?._id],
    )

    useEffect(() => {
      ref.current?.on('newMessage', (message: TMessage) =>
        onGetCount(message.chat),
      )
    }, [])

    useEffect(() => {
      isFocused && needChatDetect && getCount()
    }, [isFocused])

    const isAvailableUnreadCount = currentChat?.unreadCount

    return (
      <ProjectContainer width={width} {...props}>
        {!!isAvailableUnreadCount && <MessageCountDot />}

        {/* name and control project */}
        <Head project={project} {...props} showDates={showDates} />

        {/* Dates start end and relevant */}
        {showDates && <Dates {...project} />}

        {showStatus && <Statuses {...project} />}

        {/* Buttons for change status and end project */}
        <Content {...project} {...props} />
      </ProjectContainer>
    )
  },
)
