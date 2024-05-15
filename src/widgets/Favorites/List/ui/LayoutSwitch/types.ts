import React, { SetStateAction } from 'react'

export type TLayoutSwitchProps = {
  isGridLayout: boolean
  setValue: React.Dispatch<SetStateAction<boolean>>
}
