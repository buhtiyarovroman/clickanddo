import { Png } from '@assets/Png'
import { ImageSource } from 'react-native-image-viewing/dist/@types'
import { TImageType } from '../ui/image/Standard/types'
import { images } from './imageUrl'

export const getImageSource = (
  imagesArray: string[],
  type: TImageType,
): ImageSource[] =>
  imagesArray
    ? imagesArray.map(el => ({
        uri: el.includes('/') ? el : images[type] + el,
      }))
    : [{ uri: Png.DefaultImage }]
