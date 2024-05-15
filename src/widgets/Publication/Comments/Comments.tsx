import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { widthPercentageToDP } from 'react-native-responsive-screen'

import { useTypedSelector } from '@/app/store'
import { PublicationFeatures, useComments } from '@/features/Publication'
import { PublicationService } from '@/entities/Publication/services'
import { getUserSelector } from '@/entities/User'
import { TUser } from '@/entities/User/models'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, LSemibold, MRegular } from '@/shared/ui/Styled/Styled'
import { Loader } from '@/shared/ui/loader'
import { TouchableMore, styles } from './styles'
import { TCommentsProps, TLocalReplyTo } from './types'
import { TComment } from '@/entities/Publication/models'
import * as UI from './ui'

export const Comments = ({ id }: TCommentsProps) => {
  const { t } = useTranslation()
  const [commentValue, setCommentValue] = useState('')
  const [replyTo, setReplayTo] = useState<TLocalReplyTo | undefined>(undefined)
  const { user } = useTypedSelector(getUserSelector)

  const {
    comments,
    setComments,
    loading,
    setLoading,
    getFirstPage,
    getMore,
    canGetMoreItems,
  } = useComments({
    id,
  })

  const createComment = async () => {
    if (commentValue.length !== 0) {
      try {
        setLoading(true)

        const { data } = await PublicationService.postPublicationComment({
          to: id,
          comment: commentValue,
          replyTo: replyTo?._id,
        })

        setCommentValue('')
        setReplayTo(undefined)

        if (data.replyTo) {
          setComments(prev => [
            ...prev.map(item =>
              item._id === data.replyTo
                ? {
                    ...item,
                    repliesCount: (item.repliesCount || 0) + 1,
                    replies: [
                      { ...data, owner: user as TUser },
                      ...(item.replies || []),
                    ],
                  }
                : item,
            ),
          ])

          return
        }

        setComments(prev => [{ ...data, owner: user as TUser }, ...prev])
      } catch (err) {
        console.log('createComment err =>', err)
      } finally {
        setLoading(false)
      }
    }
  }

  const renderFooter = () => {
    if (loading) {
      return (
        <FlexWrapper
          mTop="10px"
          width="100%"
          style={{
            width: widthPercentageToDP(100) - 40,
          }}>
          <Loader.Standard />
        </FlexWrapper>
      )
    }

    return null
  }

  useEffect(() => {
    getFirstPage()
  }, [id])

  const onPressReplayTo = (dataReply: TLocalReplyTo) => {
    setReplayTo(dataReply)
  }

  const onDeleteReplay = () => {
    setReplayTo(undefined)
  }

  const renderItem = (comment: TComment) => (
    <PublicationFeatures.Comment
      {...comment}
      publicationId={id}
      onPressReplayTo={onPressReplayTo}
    />
  )

  return (
    <>
      <FlexWrapper style={styles.comments}>
        <LSemibold mBottom="10px" style={styles.title}>
          {t('comments')}
        </LSemibold>
        {comments.map(renderItem)}

        {!!canGetMoreItems && !loading && (
          <TouchableMore onPress={getMore}>
            <MRegular color={EColors.primary}>{t('more')}</MRegular>
          </TouchableMore>
        )}
        {renderFooter()}
      </FlexWrapper>

      <UI.CommentInput
        text={commentValue}
        setText={setCommentValue}
        replyTo={replyTo?.name}
        createComment={createComment}
        loading={loading}
        onDeleteReplay={onDeleteReplay}
      />
    </>
  )
}
