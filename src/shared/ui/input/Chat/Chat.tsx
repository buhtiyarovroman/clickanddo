import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { RouteProp, useRoute } from '@react-navigation/native'

import * as S from './styles'
import { TFilesChat, TInputForm, TInputProps } from './types'
import { chatInputFormSchema } from './validation'
import { Icon } from '../../Icon'
import { EColors } from '../../Styled'
import { TChatStack } from '@/app/navigation/stacks/Chat'
import { EScreens } from '@/app/navigation'
import { v4 as uuidv4 } from 'uuid'
import { chatActions } from '@/entities/Chat/store'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import { Input } from '..'
import { ImageOrVideo } from 'react-native-image-crop-picker'
import { FlexWrapper, SRegular } from '../../Styled/Styled'
import { Image } from '../../image'
import { useTranslation } from 'react-i18next'

const imageTypes = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

export const Chat = ({ flatListRef }: TInputProps) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { user } = useTypedSelector(getUserSelector)

  const { id, to } = useRoute<RouteProp<TChatStack, EScreens.ChatChat>>().params

  const { control, handleSubmit, reset } = useForm<TInputForm>({
    resolver: zodResolver(chatInputFormSchema),
  })
  const [files, setFiles] = useState<TFilesChat[]>([])

  // useFocusEffect(
  //   useCallback(() => {
  //     KeyboardController.setInputMode(
  //       AndroidSoftInputModes.SOFT_INPUT_ADJUST_RESIZE,
  //     )

  //     return () => KeyboardController.setDefaultMode()
  //   }, []),
  // )

  const onDebounceStartTyping = debounce(() => {
    // webSocket?.send(
    //   JSON.stringify({
    //     action: EChatAction.StartTyping,
    //     data: { chatId },
    //   }),
    // )
  }, 300)

  const onSendMessage = async (data: TInputForm) => {
    try {
      const reqImages = files

      const isValid = !!reqImages.length || !!data.message

      if (!isValid) return

      setFiles([])
      reset()

      const currentFiles = {
        file: reqImages.length ? reqImages.map(item => item.path) : undefined,
      }

      const messageData = {
        id: uuidv4(),
        chat: id,
        message: data.message,
        ...currentFiles,
      }

      dispatch(
        chatActions.postMessageRequest({
          ...messageData,
          userId: user?._id || '',
          to,
        }),
      )

      flatListRef.current?.scrollToIndex({
        index: 0,
        animated: true,
      })
    } catch (error) {
      console.log('onSendMessage err =>', error)
    } finally {
    }
  }

  const onGetPhotos = (paths: ImageOrVideo[]) => {
    setFiles(prev => [
      ...prev,
      ...paths.map(item => ({
        id: uuidv4(),
        path: item.path,
        name: item.filename || '',
      })),
    ])
  }

  const onGetFiles = (addFiles: string[]) => {
    setFiles(prev => [
      ...prev,
      ...addFiles.map(item => ({
        id: uuidv4(),
        path: item,
      })),
    ])
  }

  const onDeleteImage = (imageId: string) => {
    setFiles(files.filter(item => item.id !== imageId))
  }

  const renderImages = (item: TFilesChat) => {
    const isPdf = item.path.includes('.pdf')

    return (
      <S.ImageContainer key={item.id}>
        <FlexWrapper width={'auto'}>
          {isPdf && <Icon name={'FilePdf'} size={30} />}

          {!isPdf && (
            <Image.Standard source={item.path} width={'30px'} height={'30px'} />
          )}

          <SRegular mLeft={'16px'}>{item.name || ''}</SRegular>
        </FlexWrapper>

        <TouchableOpacity onPress={() => onDeleteImage(item.id)}>
          <Icon name={'Close'} size={16} stroke={EColors.black} />
        </TouchableOpacity>
      </S.ImageContainer>
    )
  }

  return (
    <>
      {files.map(renderImages)}

      <S.Container>
        <Input.ChatFileMenu
          onGetPhotoArray={onGetPhotos}
          onGetArrayPath={onGetFiles}
          cropping
          multiple
          renderContent={() => (
            <S.SendContainer background={EColors.transparent}>
              <Icon name={'PaperClip'} />
            </S.SendContainer>
          )}
        />

        <S.CInput>
          <Controller
            name="message"
            control={control}
            render={({ field: { onChange, value } }) => (
              <S.Input
                value={value}
                onChangeText={(text: string) => {
                  onChange(text)
                  onDebounceStartTyping()
                }}
                placeholder={t('write_message')}
              />
            )}
          />
        </S.CInput>
        <S.SendContainer
          onPress={handleSubmit(onSendMessage)}
          mLeft={'10px'}
          background={EColors.primary}>
          <Icon name={'ArrowUp'} />
        </S.SendContainer>
      </S.Container>
    </>
  )
}
