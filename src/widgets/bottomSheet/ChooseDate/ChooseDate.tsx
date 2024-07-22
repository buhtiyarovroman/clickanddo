import React, { forwardRef, useContext, useRef, useState } from 'react'

import { TChooseDateBottomSheetProps } from './types'

import { BottomSheet } from '@/shared/ui/bottomSheet'
import { TBottomSheetBaseRef } from '@/shared/ui/bottomSheet/Base'
import { transformPublicationToProject } from './helpers'
import * as UI from './ui'

import { useTranslation } from 'react-i18next'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { ProjectsService } from '@/entities/Projects/services'
import { LoaderContext } from '@/app/contexts/Loader'
import Toast from 'react-native-toast-message'
import { useDispatch } from 'react-redux'
import { publicationActions } from '@/entities/Publication'
import { v4 as uuidv4 } from 'uuid'
import { Button } from '@/shared/ui/button'
import { TGetFormProps, TSelectDatesRef } from './ui/DatesForm/types'
import { TProjectInfoFormRef } from './ui/ProjectInfoForm/types'
import { Container } from './styled'

export const ChooseDateBottomSheet = forwardRef<
  TBottomSheetBaseRef,
  TChooseDateBottomSheetProps
>(({ publication, onClose = () => {}, onRefresh = () => {} }, ref) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { setLoading, loader } = useContext(LoaderContext)

  const [datesValid, setDatesValid] = useState(false)

  const [dates, setDates] = useState<TGetFormProps>()

  const datesRef = useRef<TSelectDatesRef>(null)
  const infoRef = useRef<TProjectInfoFormRef>(null)

  const onSendResponse = async () => {
    if (!dates) {
      const data = datesRef.current?.getForm()

      if (!data) {
        return
      }

      setDates(data)

      return
    }

    if (!publication) {
      console.log('ERROR: no have publication in onSendResponse')
      return
    }

    setLoading(true)
    const infoData = await infoRef.current?.getForm()

    if (!infoData) {
      return
    }

    try {
      setLoading(true)
      const data = await transformPublicationToProject(
        publication,
        dates.selectedDate,
        dates.selectedHours,
        infoData,
      )

      await ProjectsService.postProject(data)

      dispatch(
        publicationActions.setState({
          singlePublication: { ...publication, userProject: uuidv4() },
        }),
      )

      Toast.show({
        type: 'success',
        text2: 'toasts.publication_responses',
      })

      onClose()
      onRefresh()
    } catch (error) {
      console.log('onSendResponse error =>', error)
    } finally {
      setLoading(false)
    }
    setLoading(false)
  }

  const onResetDates = () => {
    setDates(undefined)
  }

  return (
    <BottomSheet.Base
      onBackdropPress={onResetDates}
      onClose={onResetDates}
      snapPoints={['70%']}
      ref={ref}>
      <Container>
        {!dates && (
          <UI.DatesForm ref={datesRef} onChangeValid={setDatesValid} />
        )}

        {!!dates && <UI.ProjectInfoForm ref={infoRef} />}

        <FlexWrapper mBottom={'24px'}>
          <Button.Standard
            disabled={!datesValid || loader}
            text={t('sign_up')}
            onPress={onSendResponse}
          />
        </FlexWrapper>
      </Container>
    </BottomSheet.Base>
  )
})
