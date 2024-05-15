import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TProjectCardButtonsChangeStatusProps } from './types'
import { ProjectsService } from '@/entities/Projects/services'
import { LoaderContext } from '@/app/contexts/Loader'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'
import { styles } from './styled'

export const ChangeStatus = ({
  _id,
  specialist,
  isCustomer = false,
  onRefresh = () => {},
  isMarkDoneStatus = false,
  isProgressStatus = false,
  onOpenReview = () => {},
  isPendingSpecialistStatus = false,
}: TProjectCardButtonsChangeStatusProps) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)

  const onMarkDone = async (newStatus: EProjectTypes) => {
    if (!_id) {
      console.error('no have project id')
      return
    }

    try {
      setLoading(true)

      await ProjectsService.patchProjectStatus({
        id: _id,
        status: `${newStatus}`,
      })

      if (newStatus === EProjectTypes.done) {
        onOpenReview()

        return
      }

      onRefresh()
    } catch (err) {
      console.log('ProjectOnMarkDone err =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!isCustomer && !!specialist && isProgressStatus && (
        <FlexWrapper justify={'space-between'}>
          <Button.Standard
            width={'100%'}
            mTop={'16px'}
            color={EColors.black}
            onPress={() => onMarkDone(EProjectTypes.mark_done)}
            text={t('tabs_list.completed')}
          />
        </FlexWrapper>
      )}

      {!isCustomer && !!specialist && isPendingSpecialistStatus && (
        <FlexWrapper flexDirection={'column'}>
          <Button.Standard
            mTop={'16px'}
            color={EColors.black}
            onPress={() => onMarkDone(EProjectTypes.in_progress)}
            text={t('take_the_job')}
          />

          <Button.Standard
            mTop={'16px'}
            style={styles.button}
            color={EColors.transparent}
            textColor={EColors.black}
            onPress={() => onMarkDone(EProjectTypes.rejected_by_specialist)}
            text={t('refuse')}
          />
        </FlexWrapper>
      )}

      {isCustomer && !!specialist && isMarkDoneStatus && (
        <FlexWrapper mTop={'16px'} justify={'space-between'}>
          <Button.Standard
            height={'45px'}
            width={'49%'}
            style={styles.button}
            color={EColors.transparent}
            onPress={() => onMarkDone(EProjectTypes.in_progress)}>
            <MRegular color={EColors.black}>{t('cancel')}</MRegular>
          </Button.Standard>

          <Button.Standard
            height={'45px'}
            width={'49%'}
            color={EColors.black}
            onPress={() => onMarkDone(EProjectTypes.done)}>
            <MRegular color={EColors.white}>{t('mark_completed')}</MRegular>
          </Button.Standard>
        </FlexWrapper>
      )}
    </>
  )
}
