import React, { useContext, useRef } from 'react'
import { TResponseCardButtonsProps } from './types'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { styles } from './styled'
import { EColors } from '@/shared/ui/Styled'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import { LoaderContext } from '@/app/contexts/Loader'
import { ProjectEntities } from '@/entities/Projects'
import { BottomSheet } from '@/widgets/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'

export const Buttons = ({
  _id = '',
  specialist = '',
  onRefresh = () => {},
}: TResponseCardButtonsProps) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)
  const ref = useRef<TBottomSheetBaseRef | null>(null)

  const specialistApprove = async () => {
    if (!_id || !specialist) {
      console.error('no have _id || !specialist')
      return
    }
    try {
      setLoading(true)

      await ProjectEntities.ProjectsService.postProjectApprove({
        id: _id,
        specialist: specialist,
      })

      onRefresh()
    } catch (err) {
      console.log('specialistApprove err =>', err)
    } finally {
      setLoading(false)
    }
  }

  const onOpen = () => {
    ref.current?.open()
  }

  const onClose = () => {
    ref.current?.close()
  }

  return (
    <>
      <FlexWrapper mTop={'20px'} flexDirection={'column'}>
        <Button.Standard
          color={EColors.black}
          text={t('take_the_job')}
          onPress={specialistApprove}
        />

        <Button.Standard
          mTop={'12px'}
          color={EColors.transparent}
          textColor={EColors.black}
          text={t('message')}
          style={styles.button}
          onPress={onOpen}
        />
      </FlexWrapper>

      <BottomSheet.ContactSpecialistBottomSheet
        ref={ref}
        onClose={onClose}
        _id={specialist}
        project={_id}
      />
    </>
  )
}
