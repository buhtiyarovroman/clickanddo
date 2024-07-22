import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Button } from '@/shared/ui/button'
import React from 'react'
import { TAddChangeButtonsProps } from './types'

export const AddChangeButtons = ({
  onAddPress = () => {},
  onEditPress = () => {},
  hideAdd = false,
  hideEdit = false,
}: TAddChangeButtonsProps) => (
  <FlexWrapper width={'auto'}>
    {!hideEdit && <Button.IconButton onPress={onEditPress} />}
    {!hideAdd && (
      <Button.IconButton
        onPress={onAddPress}
        mLeft={'12px'}
        icon={'PlusGray'}
      />
    )}
  </FlexWrapper>
)
