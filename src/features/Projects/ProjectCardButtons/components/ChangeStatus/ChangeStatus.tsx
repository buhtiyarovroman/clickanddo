import { EColors } from '@/shared/ui/Styled'
import { Button } from '@/shared/ui/button'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TProjectCardButtonsChangeStatusProps } from './types'
import { ProjectsService } from '@/entities/Projects/services'
import { LoaderContext } from '@/app/contexts/Loader'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
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
  origin,
}: TProjectCardButtonsChangeStatusProps) => {
  const { t } = useTranslation()
  const { setLoading } = useContext(LoaderContext)

  const onMarkDone = async (newStatus: EProjectTypes) => {
    //Deleting project if will set  status = rejected_by_specialist and have origin
    const isRejected =
      newStatus === EProjectTypes.rejected_by_specialist && !!origin
    if (!_id) {
      console.error('no have project id')
      return
    }

    try {
      setLoading(true)

      if (isRejected) {
        await ProjectsService.deleteProject(_id)
      }

      if (!isRejected) {
        await ProjectsService.patchProjectStatus({
          id: _id,
          status: `${newStatus}`,
        })
      }

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
    </>
  )
}
