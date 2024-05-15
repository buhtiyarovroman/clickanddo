import { images } from '@/shared/config'
import { Platform } from 'react-native'
import RNFetchBlob from 'rn-fetch-blob'

type TProps = {
  image: string
}

export const convertFileIOS = async ({ image }: TProps) => {
  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
      path: RNFetchBlob.fs.dirs.DocumentDir + '/tmp.png',
    }).fetch('GET', images.publication + image)

    const base64Data = response.path()
    return base64Data
  } catch (e) {
    console.log('Error while fetching and converting file: ', e)
  }
}

const convertFileAndroid = async ({ image }: TProps) => {
  let imagePath = ''

  console.log('android parse')

  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', images.publication + image)

    imagePath = response.path()

    const base64Data = await response.readFile('base64')

    const base64EncodedImage = 'data:image/png;base64,' + base64Data

    await RNFetchBlob.fs.unlink(imagePath)

    return base64EncodedImage
  } catch (e) {
    console.error('An error occurred:', e)
  }
}

export const convertFile = async (image: string[]) => {
  if (image.length < 1) return ''
  const singleImage = image[0]
  return Platform.OS === 'ios'
    ? await convertFileIOS({ image: singleImage })
    : await convertFileAndroid({ image: singleImage })
}
