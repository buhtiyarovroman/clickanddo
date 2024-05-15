import React from 'react'
import { UnreadText, UnreadContainer } from './styled'
import { getChatSelector } from '@/entities/Chat/store'
import { useTypedSelector } from '@/app/store'
import { TAllUnreadCounterProps } from './types'

export const UnreadCounter = ({
  count = 0,
  size = '19px',
  showTotal = false,
}: TAllUnreadCounterProps) => {
  const { allUnreadCount } = useTypedSelector(getChatSelector)

  const totalCount = allUnreadCount.reduce((item, countMessages) => {
    return item + countMessages.count
  }, 0)

  return (
    <>
      {!showTotal && !!count && (
        <UnreadContainer {...{ size }}>
          <UnreadText>{count}</UnreadText>
        </UnreadContainer>
      )}

      {!!showTotal && !!totalCount && (
        <UnreadContainer {...{ size }}>
          <UnreadText>{totalCount}</UnreadText>
        </UnreadContainer>
      )}
    </>
  )
}
