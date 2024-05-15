import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Button } from '@/shared/ui/button'
import React from 'react'
import { TAddChangeButtonsProps } from './types'

export const AddChangeButtons = ({
  onAddPress = () => {},
  onEditPress = () => {},
  hideAdd = false,
  hideEdit = false,
}: TAddChangeButtonsProps) => {
  return (
    <FlexWrapper width={'auto'}>
      {!hideEdit && <Button.IconButton onPress={onEditPress} mRight={'12px'} />}
      {!hideAdd && <Button.IconButton onPress={onAddPress} icon={'PlusGray'} />}
    </FlexWrapper>
  )
}
