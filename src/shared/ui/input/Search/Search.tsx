import React from 'react'

import { Input } from '..'
import { EColors } from '../../Styled'
import { TStandard } from '../Standard/types'

export const Search = ({ ...props }: TStandard) => (
  <>
    <Input.Standard
      leftIcon={'Search'}
      leftIconProps={{ stroke: EColors.grey_600 }}
      {...props}
    />
  </>
)
