import React from 'react'
import { FileContainer, FileImageContainer, DownloadContainer } from './styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { TFileProps } from './types'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { Icon } from '@/shared/ui/Icon'
import RNFS from 'react-native-fs'
import { images } from '@/shared/config'
import Toast from 'react-native-toast-message'

export const FileComponent = ({ isMy = false, path }: TFileProps) => {
  const { t } = useTranslation()
  const currentColor = isMy ? EColors.white : EColors.black
  const currentFile = isMy ? EColors.primary_D1 : EColors.grey_200

  const downloadFile = async () => {
    const url = images.chat + path
    const filePath = `${RNFS.ExternalStorageDirectoryPath}/Download/${path}`

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: () => {
        // Handle download progress updates if needed
        // const progress = (res.bytesWritten / res.contentLength) * 100
        // console.log(`Progress: ${progress.toFixed(2)}%`)
      },
    })
      .promise.then(() => {
        Toast.show({
          type: 'success',
          text1: 'toasts.file_downloaded',
          text2: 'toasts.file_folder',
        })
      })
      .catch(err => {
        console.log('Download error:', err)
      })
  }

  return (
    <FileContainer color={currentFile}>
      <FlexWrapper width={'auto'}>
        <FileImageContainer>
          <Icon name={'FilePdf'} size={30} fill={currentColor} />
        </FileImageContainer>
        <MRegular mLeft={'5px'} color={currentColor}>
          {t('pdf_file')}
        </MRegular>
      </FlexWrapper>

      <DownloadContainer onPress={downloadFile}>
        <Icon name={'DownloadChat'} fill={currentColor} />
      </DownloadContainer>
    </FileContainer>
  )
}
