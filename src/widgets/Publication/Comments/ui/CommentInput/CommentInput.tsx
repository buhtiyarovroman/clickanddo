import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { Icon } from '@/shared/ui/Icon'
import { Image } from '@/shared/ui/image'
// import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MRegular, Touchable } from '@/shared/ui/Styled/Styled'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { TouchableWithoutFeedback, View } from 'react-native'
import { styles, Input, InputContainer } from './styled'
import { TCommentInputProps } from './types'

export const CommentInput = ({
  text = '',
  setText = () => {},
  replyTo,
  loading = false,
  createComment = () => {},
  onDeleteReplay = () => {},
}: TCommentInputProps) => {
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)
  return (
    <>
      {!!replyTo && (
        <FlexWrapper style={styles.replayTo} justify={'space-between'}>
          <MRegular>
            {t('reply_to')}: {replyTo}
          </MRegular>

          <Touchable onPress={onDeleteReplay} width={'auto'}>
            <Icon name={'Close'} stroke={EColors.black} size={18} />
          </Touchable>
        </FlexWrapper>
      )}

      <FlexWrapper justify="space-between" align="flex-start" width="100%">
        <View style={styles.my_avatar}>
          <Image.Standard
            type="user"
            source={user?.photo}
            width="100%"
            height="100%"
          />
        </View>

        <InputContainer>
          <Input
            value={text}
            onChangeText={setText}
            placeholder={t('comment_placeholder')}
          />
        </InputContainer>
        {/* <Input.TextArea
          value={text}
          onChange={setText}
          placeholder={t('comment_placeholder')}
          width={'70%'}
          height={40}
          label={t('comment_placeholder')}
        /> */}
        <TouchableWithoutFeedback disabled={loading} onPress={createComment}>
          <FlexWrapper style={styles.button_wrapper}>
            <Icon
              style={styles.button_icon}
              name="Send"
              fill={EColors.transparent}
              stroke={EColors.white}
              size={25}
            />
          </FlexWrapper>
        </TouchableWithoutFeedback>
      </FlexWrapper>
    </>
  )
}
