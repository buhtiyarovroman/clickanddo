import React, { forwardRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-toast-message'

import { EToastType } from '@/app/contexts/Toast/types'
import { ProjectsService } from '@/entities/Projects/services'

import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/Icon'
import { Input } from '@/shared/ui/input'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, LRegular, LSemibold } from '@/shared/ui/Styled/Styled'

import { Container } from './styles'
import { TReportProjectProps } from './types'
import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { useKeyboardStatus } from '@/features/hooks'

export const ReportProject = forwardRef<
  TBottomSheetBaseRef,
  TReportProjectProps
>(({ reportedProjectId, onClose = () => {} }, ref) => {
  const { t } = useTranslation()
  const [reportValue, setReportValue] = useState('')
  const { isOpen: isKeyboardOpen } = useKeyboardStatus()
  const handleClose = () => {
    setReportValue('')
    onClose()
  }

  const onSubmitPress = async () => {
    if (reportValue.length > 0 && reportedProjectId) {
      try {
        await ProjectsService.reportProject({
          projectId: reportedProjectId,
          reportText: reportValue,
        })

        handleClose()
        Toast.show({
          type: EToastType.success,
          text2: 'toasts.report_sended',
        })
        setReportValue('')
      } catch (err) {
        console.log('sendReport err =>', err)
      }
    }
  }

  return (
    <BottomSheet.Base
      onClose={handleClose}
      snapPoints={[isKeyboardOpen ? '75%' : '60%']}
      ref={ref}>
      <Container>
        <FlexWrapper mBottom="15px" justify="space-between">
          <LRegular>{t('report')}</LRegular>
          <TouchableOpacity activeOpacity={0.8} onPress={handleClose}>
            <Icon
              name="Close"
              fill={EColors.black}
              size={20}
              stroke={EColors.grey_500}
            />
          </TouchableOpacity>
        </FlexWrapper>

        <Input.TextArea
          onChange={setReportValue}
          value={reportValue}
          placeholder={t('enter_report_text')}
        />
        <Button.Standard onPress={onSubmitPress} color={EColors.primary}>
          <LSemibold color={EColors.white}>{t('send')}</LSemibold>
        </Button.Standard>
      </Container>
    </BottomSheet.Base>
  )
})
