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

const maxSizeMB = 6 * 1024 * 1024

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

  const onValidate = async (image: ImageOrVideo | ImageOrVideo[]) => {
    if (multiple) {
      if (Array.isArray(image)) {
        let validation = image.map(item => {
          if (item.size > maxSizeMB) {
            return false
          }

          return true
        })

        let validationImage = image.filter(item => {
          console.log('validate =>', item.size, maxSizeMB)
          return item.size < maxSizeMB
        })

        let invalidIndexes = validation.map((item, index) =>
          !item ? index : undefined,
        )

        let res = invalidIndexes.filter(item => item !== undefined)

        if (res.length) {
          Toast.show({
            type: 'error',
            text1: t('errors.photo_size_index', {
              index: res.map(item => (item || 0) + 1).join(', '),
            }),
          })

          return validationImage
        }

        return validationImage
      }

      return image
    }

    if (typeof image === 'object') {
      let data = image as ImageOrVideo
      const sizeMB = data.size

      if (sizeMB > maxSizeMB) {
        Toast.show({ type: 'error', text1: t('errors.photo_size') })
        return undefined
      }

      return image
    }
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
    console.log('array paths')

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
            onGetPhotoArrayPath={photoArray =>
              multiple && onGetArrayPath(photoArray)
            }
            multiple={multiple}
            maxFiles={maxFiles - photos.length}
          />
        )}
      </FlexWrapper>

      <FlexWrapper justify={'flex-end'}>
        {error && (
          <SRegular style={styles.text} color={EColors.error}>
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
