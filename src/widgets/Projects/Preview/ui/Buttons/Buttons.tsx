import React, { useContext } from 'react'
import { TProjectPreviewMainProps } from './types'
import { useTypedSelector } from '@/app/store'
import { Button } from '@/shared/ui/button'
import { useTranslation } from 'react-i18next'
import { EColors } from '@/shared/ui/Styled'
import { StyleSheet } from 'react-native'
import { LoaderContext } from '@/app/contexts/Loader'
import { ProjectEntities } from '@/entities/Projects'
import { getProjectsSelector, projectsActions } from '@/entities/Projects/store'
import { EProjectTypes } from '@/widgets/Projects/ProjectCard/types'
import { useDispatch } from 'react-redux'

export const Buttons = ({ onSuccess = () => {} }: TProjectPreviewMainProps) => {
  const { t } = useTranslation()
  const { setLoading, loader } = useContext(LoaderContext)
  const { createProjects } = useTypedSelector(getProjectsSelector)
  const dispatch = useDispatch()

  const isEdit = !!createProjects.id
  const isSpecialist = !!createProjects.specialist
  const publicizeText = isSpecialist ? t('invite_specialist') : t('publish')

  const patchImageProject = async (images: string[]) => {
    try {
      const localImages = images.filter(el => el.includes('/'))
      const serverImages = images.filter(el => !el.includes('/'))

      if (localImages.length !== 0) {
        await ProjectEntities.ProjectsService.patchProjectImage({
          id: createProjects.id,
          images: localImages,
          oldImages: serverImages,
        })
      }
    } catch (error) {
      console.log('patchProject =>', error)
    }
  }

  const onPublication = async (isDraft: boolean) => {
    setLoading(true)

    try {
      const status = isSpecialist
        ? EProjectTypes.pending_specialist
        : isDraft
        ? EProjectTypes.hold
        : undefined

      const localStatus = createProjects.status
      const isHold =
        localStatus === 'hold' || localStatus === 'rejected-by-specialist'

      const addServiceInfo = createProjects.additionalService
      const images = createProjects.images
      const locationInfo = createProjects.location
      const location = locationInfo?.coordinates.length
        ? locationInfo
        : undefined

      const addService =
        addServiceInfo.name &&
        addServiceInfo.hashtag.length &&
        addServiceInfo.description
          ? {
              ...addServiceInfo,
              hashtag: createProjects.additionalService.hashtag.map(
                el => el._id,
              ),
            }
          : undefined

      const data = {
        ...createProjects,
        hashtag: createProjects.hashtag.map(el => el._id),
        additionalService: addService,
        location: location,

        images: undefined,
        status: status,
      }

      if (isHold && !isDraft) {
        await patchImageProject(images)

        await ProjectEntities.ProjectsService.patchProject({
          id: createProjects.id,
          data: { ...data, projectResponses: [] },
        })

        await ProjectEntities.ProjectsService.patchProjectStatus({
          id: createProjects.id,
          status: EProjectTypes.searching,
        })
      }

      if (!isEdit && !isHold) {
        const response = await ProjectEntities.ProjectsService.postProject(data)
        if (images.length !== 0) {
          await ProjectEntities.ProjectsService.patchProjectImage({
            id: response.data._id,
            images,
            oldImages: [],
          })
        }
      }
      if (isEdit) {
        await patchImageProject(images)

        await ProjectEntities.ProjectsService.patchProject({
          id: createProjects.id,
          data: data,
        })
      }

      dispatch(projectsActions.clearProjectCreate())

      onSuccess(isDraft, isSpecialist)
    } catch (err) {
      console.log('onPublication project err =>', err.response.data)
    } finally {
      setLoading(false)
    }
  }

  const onPressPublicize = () => {
    onPublication(false)
  }

  const onPressDraft = () => {
    onPublication(true)
  }

  return (
    <>
      <Button.Standard
        disabled={loader}
        mTop={'16px'}
        mBottom={'16px'}
        text={publicizeText}
        onPress={onPressPublicize}
      />

      {!isSpecialist && (
        <Button.Standard
          disabled={loader}
          color={EColors.transparent}
          textColor={EColors.black}
          style={styles.button}
          onPress={onPressDraft}
          text={t('save_in_draft')}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: EColors.black,
  },
})
