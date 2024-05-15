import React, { useEffect, useState } from 'react'
import { StyledImage } from './styled'

import { TImageStandard } from './types'
import { ImageRequireSource, ImageSourcePropType } from 'react-native'
import { Png } from '@assets/Png'
import { images } from '@/shared/config'

const DEFAULT_IMAGE = Png.DefaultImage

const StandardComponent = ({
  height = '48px',
  width = '48px',
  pngSource,
  style = {},
  ...props
}: TImageStandard) => {
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(false)
  }, [props.source])

  const validSourse = props.source
    ? { uri: props.type ? images[props.type] + props.source : props.source }
    : { uri: DEFAULT_IMAGE + '' }

  const source = error ? DEFAULT_IMAGE : validSourse
  return (
    <StyledImage
      {...props}
      source={(pngSource || source) as ImageSourcePropType}
      onError={() => {
        setError(true)
      }}
      w={width}
      h={height}
      defaultSource={DEFAULT_IMAGE as ImageRequireSource}
      style={style}
    />
  )
}

export const Standard = React.memo(StandardComponent)
