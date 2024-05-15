import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import { TAdditionalInfoBottomBarProps } from './types'

export const AdditionalInfoBottomBar = ({
  getHeight = () => {},
  onNext = () => {},
  onSave = () => {},
  onSkip = () => {},
  isEdit = false,
  valid = true,
}: TAdditionalInfoBottomBarProps) => {
  const { t } = useTranslation()
  return (
    <CustomBottomBar getHeight={getHeight}>
      {isEdit && (
        <Button.Standard text={t('next')} onPress={onSave} disabled={!valid} />
      )}
      {!isEdit && (
        <>
          <Button.Standard
            color={EColors.transparent}
            style={styles.button}
            textColor={EColors.grey_600}
            text={t('skip')}
            width={'45%'}
            onPress={onSkip}
          />

          <Button.Standard
            width={'45%'}
            text={t('next')}
            onPress={onNext}
            disabled={!valid}
          />
        </>
      )}
    </CustomBottomBar>
  )
}

export const styles = StyleSheet.create({
  button: { borderWidth: 1, borderColor: EColors.grey_600 },
})
