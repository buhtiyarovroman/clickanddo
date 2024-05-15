import React from 'react'
import { TPhotosProps, TPhotosPickProps } from './types'
import {
  FlexWrapper,
  H3SemiBold,
  MRegular,
  SRegular,
} from '@/shared/ui/Styled/Styled'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import {
  AddImage,
  ImageDelete,
  ProjectImage,
  Container,
  styles,
} from './styled'
import { Icon } from '@/shared/ui/Icon'
import { ImageOrVideo } from 'react-native-image-crop-picker'
import Toast from 'react-native-toast-message'
import { Input } from '@/shared/ui/input'
import { v4 as uuidv4 } from 'uuid'
import { images } from '@/shared/config'

const maxSizeMB = 100

export const Photos = ({
  photos = [],
  withTitle = true,
  onChange = () => {},
  imageType = 'project',
  multiple = false,
  maxFiles = 1,
  renderContent,
  error,
  imageStyle = {},
  ...props
}: TPhotosPickProps) => {
  const { t } = useTranslation()
  const isMax = photos.length < maxFiles

  const renderDefaultContent = () => (
    <AddImage isFirst={photos.length === 0}>
      <Icon name={'Clip'} size={18} />

      <SRegular>{t('add')}</SRegular>
    </AddImage>
  )

  const onValidate = (image: ImageOrVideo) => {
    const sizeMB = image.size * 0.000001

    if (sizeMB > maxSizeMB) {
      Toast.show({ type: 'error', text1: t('errors.photo_size') })
      return false
    }

    return true
  }

  const onDelete = (id: string) => {
    onChange(photos.filter(item => item.id !== id))
  }

  const renderPhotos = (item: TPhotosProps) => {
    const source = item.path.includes('/') ? '' : images[imageType]
    //Add sizing image
    return (
      <FlexWrapper
        key={item.id}
        width={'auto'}
        mRight={'15px'}
        mBottom={'10px'}>
        <ProjectImage
          imageStyle={styles.imageBackground}
          style={imageStyle}
          source={{ uri: source + item.path }}>
          <FlexWrapper style={styles.closeContainer} justify={'flex-end'}>
            <ImageDelete onPress={() => onDelete(item.id)}>
              <Icon name={'Close'} size={10} stroke={EColors.black} />
            </ImageDelete>
          </FlexWrapper>
        </ProjectImage>
      </FlexWrapper>
    )
  }

  const onGetPath = (path: string) => {
    onChange([...photos, { id: uuidv4(), path }])
  }

  const onGetArrayPath = (path: string[]) => {
    const paths = path.map(el => ({ id: uuidv4(), path: el }))

    onChange([...photos, ...paths])
  }

  return (
    <Container {...props}>
      {withTitle && (
        <>
          <H3SemiBold mTop={'20px'} mBottom={'12px'}>
            {t('photos')}
          </H3SemiBold>

          <MRegular mBottom={'16px'} color={EColors.grey_700}>
            {t('attach_files_100mb')}
          </MRegular>
        </>
      )}

      <FlexWrapper
        mBottom={'16px'}
        mTop={'16px'}
        wrap={'wrap'}
        justify={'flex-start'}
        align={'flex-start'}>
        {photos.map(renderPhotos)}

        {isMax && (
          <Input.PhotoMenu
            cropping
            renderContent={renderContent ? renderContent : renderDefaultContent}
            onValidate={onValidate}
            onGetPhotoPath={photo => !multiple && onGetPath(photo)}
            onGetPhotoArrayPath={photos => multiple && onGetArrayPath(photos)}
            multiple={multiple}
            maxFiles={maxFiles - photos.length}
          />
        )}
      </FlexWrapper>

      <FlexWrapper justify={'flex-end'}>
        {error && (
          <SRegular style={{ width: '80%' }} color={EColors.error}>
            {error}
          </SRegular>
        )}

        <SRegular color={EColors.grey_500}>
          {photos.length}/{maxFiles}
        </SRegular>
      </FlexWrapper>
    </Container>
  )
}
