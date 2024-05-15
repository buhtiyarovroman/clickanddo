import React, { useCallback, useState } from 'react'
import { MessageTextContainer, Container, MessageContainer } from './styled'
import { FlexWrapper, MRegular, SRegular } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { TMessageProps } from './types'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { IconPeace, Images } from './ui'
import { format } from 'date-fns'
import ImageView from 'react-native-image-viewing'
import { ImageSource } from 'react-native-image-viewing/dist/@types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Png } from '@assets/Png'
import { images } from '@/shared/config'

export const Message = ({
  from,
  to,
  message,
  createdAt = new Date().toString(),
  isLastGroupMessage = false,
  files = [],
}: TMessageProps) => {
  const { user } = useTypedSelector(getUserSelector)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const { bottom } = useSafeAreaInsets()

  const isSystemMessage = !from && !to

  const getImageSource = (): ImageSource[] => {
    const imagesFile = files.filter(el => !el.includes('.pdf'))
    return imagesFile.length
      ? imagesFile.map(el => ({ uri: images.chat + el }))
      : [{ uri: Png.DefaultImage } as ImageSource]
  }

  const time = format(new Date(createdAt), 'HH:mm')

  const isMy = user?._id === from
  const textColor = isMy ? EColors.white : EColors.black

  const renderFooterComponent = useCallback(
    (imageIndex: number) => (
      <FlexWrapper style={{ marginBottom: bottom }}>
        <MRegular color={EColors.white}>
          {imageIndex + 1}/{files.length}
        </MRegular>
      </FlexWrapper>
    ),
    [bottom, files.length],
  )

  const onPressImage = (index: number) => {
    setCurrentIndex(index)
    setVisible(true)
  }

  return (
    <>
      <Container isSystemMessage={isSystemMessage} isMy={isMy}>
        <MessageContainer isMy={isMy}>
          <MessageTextContainer isMy={isMy}>
            {/* Images component */}
            <Images isMy={isMy} files={files} onPress={onPressImage} />

            {/* Text message */}
            {message && <MRegular color={textColor}>{message}</MRegular>}
          </MessageTextContainer>

          {/* Message Tail */}
          {!isSystemMessage && <IconPeace isMy={isMy} />}
        </MessageContainer>

        {!isSystemMessage && isLastGroupMessage && (
          <SRegular color={EColors.grey_500} mTop={'5px'}>
            {time}
          </SRegular>
        )}
      </Container>

      <ImageView
        images={getImageSource()}
        imageIndex={currentIndex ?? 0}
        backgroundColor={'#0000005e'}
        visible={visible}
        onRequestClose={() => setVisible(false)}
        FooterComponent={({ imageIndex }) => renderFooterComponent(imageIndex)}
      />
    </>
  )
}
