import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, MRegular } from '@/shared/ui/Styled/Styled'

import * as Styled from './styled'
import { Image } from '@/shared/ui/image'
import * as UI from './ui'
import { Button } from '@/shared/ui/button'
import { TPublicationResponseCardProps } from './types'
import { format } from 'date-fns'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { LoaderContext } from '@/app/contexts/Loader'
import { ProjectsService } from '@/entities/Projects/services'

export const ResponsesCard = ({
  _id = '',
  name = '',
  startDate = new Date().toString(),
  owner,
  disableButtons = false,
  status = 'searching',
  onRefresh = () => {},
  onAddCount = () => {},
  ...props
}: TPublicationResponseCardProps) => {
  const { setLoading } = useContext(LoaderContext)
  const { t } = useTranslation()

  const isProgress = status === 'in-progress'

  const formattingData = format(new Date(startDate), 'HH:mm, dd.MM')

  const visible = isProgress ? false : !disableButtons

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
      onAddCount(prev => prev + 1)
      onRefresh()
    } catch (err) {
      console.log('ProjectOnMarkDone err =>', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Styled.Container {...props}>
      <FlexWrapper justify={'flex-start'} mBottom={'10px'}>
        <Image.Standard source={owner?.photo} type={'user'} />

        <MRegular mLeft={'5px'}>
          {owner?.name} {owner?.secondName}
        </MRegular>
        <MRegular color={EColors.grey_500}> {t('left_request')}</MRegular>
      </FlexWrapper>

      <UI.ListItem title={t('service_name')} value={name} />
      <UI.ListItem title={t('date_and_time')} value={formattingData} />

      {visible && (
        <FlexWrapper justify={'space-between'}>
          <Button.Standard
            width={'48%'}
            textColor={EColors.primary}
            color={EColors.white}
            height={'35px'}
            text={t('reject')}
            onPress={() => onMarkDone(EProjectTypes.rejected_by_specialist)}
          />

          <Button.Standard
            width={'48%'}
            text={t('accept')}
            height={'35px'}
            onPress={() => onMarkDone(EProjectTypes.in_progress)}
          />
        </FlexWrapper>
      )}
    </Styled.Container>
  )
}
