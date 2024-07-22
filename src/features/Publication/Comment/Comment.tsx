import { TComment } from '@/entities/Publication/models'
import React, { useEffect, useState } from 'react'
import { useComments } from '../hooks'
import { TPublicationCommentProps } from './types'
import * as UI from './ui'
import { ReplayContainer } from './styles'
import { SRegular, Touchable } from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'

export const Comment = ({
  publicationId,
  _id,
  repliesCount,
  replies = [],
  ...props
}: TPublicationCommentProps) => {
  const { t } = useTranslation()

  const [showMore, setShowMore] = useState(false)
  const { comments, getFirstPage } = useComments({
    id: publicationId,
    replyTo: _id,
  })

  const currentRepliesCount = (repliesCount || 0) - replies.length

  useEffect(() => {
    !!repliesCount && getFirstPage()
  }, [repliesCount])

  const renderItem = (item: TComment) => <UI.Item key={item._id} {...item} />

  const onPressShoeMore = () => {
    setShowMore(true)
  }

  return (
    <>
      <UI.Item _id={_id} {...props} />

      {!showMore && (
        <>
          <ReplayContainer>
            {comments.slice(0, 3).map(renderItem)}
          </ReplayContainer>

          {!!currentRepliesCount && (
            <Touchable onPress={onPressShoeMore}>
              <SRegular>
                {t('show_more', { value: currentRepliesCount })}
              </SRegular>
            </Touchable>
          )}
        </>
      )}

      {showMore && !!comments.length && (
        <ReplayContainer>{comments.map(renderItem)}</ReplayContainer>
      )}
    </>
  )
}
