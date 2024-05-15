import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { Button } from '@/shared/ui/button'
import { BottomSheet } from '@/widgets/bottomSheet'
import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { TPublicationResponses } from './types'

export const Response = ({
  publication,
  onRefresh = () => {},
}: TPublicationResponses) => {
  const { t } = useTranslation()
  const ref = useRef<TBottomSheetBaseRef | null>(null)

  const onOpenResponseBottomSheet = async () => {
    ref.current?.open()
  }

  const onClose = () => {
    ref.current?.close()
  }
  return (
    <>
      <Button.Standard
        text={t('send_response')}
        onPress={onOpenResponseBottomSheet}
        disabled={!!publication?.userProject}
      />

      <BottomSheet.ChooseDateBottomSheet
        ref={ref}
        onClose={onClose}
        publication={publication}
        onRefresh={onRefresh}
      />
    </>
  )
}
