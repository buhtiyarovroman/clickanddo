import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { styles, ShowMoreTextContainer, StyledInput } from './styled'
import { Keyboard } from 'react-native'
import { TIconsKeys } from '@assets/Svg'
import { TSpecialistUserDescriptionProps } from './types'
import { Button } from '@/shared/ui/button'
import { useDispatch } from 'react-redux'
import { userActions } from '@/entities/User'
import { MoreText } from '@/shared/ui/MoreText'

export const Description = ({
  isEdit = false,
  description = '',
}: TSpecialistUserDescriptionProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [isEditFiled, setIsEdit] = useState(false)
  const [value, setValue] = useState(description)

  useEffect(() => {
    setValue(description)
  }, [description])

  const CurrentIcon: TIconsKeys = isEditFiled ? 'PlusGray' : 'Pencel'

  const onPressIcon = () => {
    if (isEditFiled) {
      dispatch(userActions.patchUserRequest({ description: value }))
    }
    setIsEdit(!isEditFiled)
    Keyboard.dismiss()
  }

  return (
    <FlexWrapper
      mTop={'20px'}
      mBottom={'20px'}
      align={'flex-start'}
      justify={'space-between'}>
      <ShowMoreTextContainer>
        {!isEditFiled && isEdit && (
          <MoreText placeholder={t('empty.user.description')} value={value} />
        )}

        {isEditFiled && (
          <StyledInput
            style={[styles.textInput]}
            value={value}
            onChangeText={setValue}
            multiline
          />
        )}
      </ShowMoreTextContainer>
      {isEdit && <Button.IconButton onPress={onPressIcon} icon={CurrentIcon} />}
    </FlexWrapper>
  )
}
