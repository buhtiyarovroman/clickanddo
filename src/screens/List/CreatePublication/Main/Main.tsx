import React, { useRef, useState, useContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { captureException } from '@sentry/react-native'

import { EScreens } from '@/app/navigation'
import { LoaderContext } from '@/app/contexts/Loader'

import { Header } from '@/widgets/header'
import {
  TCreatePublicationForm,
  TCreatePublicationFormRef,
} from '@/features/List/ui'
import { ListFeatures } from '@/features/List'
import { useNavigation } from '@/features/hooks'

import {
  getPublicationSelector,
  publicationActions,
  PublicationEntities,
} from '@/entities/Publication'
import { EPublicationType } from '@/entities/Publication/models'

import { Button } from '@/shared/ui/button'
import { EColors } from '@/shared/ui/Styled'
import { Background } from '@/shared/ui/background'
import { CustomBottomBar } from '@/shared/ui/CustomBottomBar'
import { BackHandler, Image } from 'react-native'

import { TPostPhotosProps } from './types'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '@/app/store'
import { TModalViewRef } from '@/shared/ui/modals/ViewModal'
import { Modal } from '@/shared/ui/modals'

export const Main = () => {
  const { t } = useTranslation()
  const { goBack, reset } = useNavigation()
  const { setLoading, loader } = useContext(LoaderContext)
  const ref = useRef<TCreatePublicationFormRef | null>(null)
  const modalRef = useRef<TModalViewRef>(null)

  const dispatch = useDispatch()
  const { createPublication } = useTypedSelector(getPublicationSelector)

  const [height, setHeight] = useState<number>(0)

  const onSetDefault = () => {
    dispatch(publicationActions.setCreatePublicationDefault())
  }

  const isEdit = !!createPublication.id

  const onGetData = async () => {
    setLoading(true)

    const formData = await ref.current?.getForm()
    if (!formData) {
      setLoading(false)

      return
    }
    await postPublication(formData)
  }

  const postPublication = async (formData: TCreatePublicationForm) => {
    setLoading(true)
    const getSizePromise = new Promise<{ width: number; height: number }>(
      (resolve, reject) => {
        const newImages = formData.images.filter(el => el.path.includes('/'))
        if (!!newImages.length) {
          Image.getSize(
            newImages[0].path,
            (width, imageHeight) => {
              resolve({ width, height: imageHeight })
            },
            reject,
          )
        }
        resolve({ width: 0, height: 0 })
      },
    )

    try {
      const { width: imageWidth, height: imageHeight } = await getSizePromise

      let id = ''

      const requestData = {
        type: EPublicationType.publication,
        heading: formData.title,
        description: formData.description,
        ...(formData.coordinates.length
          ? {
              location: {
                type: 'Point',
                coordinates: formData.coordinates,
              },
            }
          : {}),
        address: formData.location,
        price: !!formData.price ? Number(formData.price) : undefined,
        currency: !!formData.price ? formData.currency : undefined,
        hideLikes: formData.hideLikes,
        imageHeight: imageHeight ?? undefined,
        imageWidth: imageWidth ?? undefined,
        hashtag: formData.hashtag.map(item => item._id),
      }

      if (isEdit) {
        await PublicationEntities.PublicationService.patchPublicationById({
          id: createPublication.id!,
          ...requestData,
        })

        id = createPublication.id!
      }

      if (!isEdit) {
        const { data } =
          await PublicationEntities.PublicationService.postPublication(
            requestData,
          )

        id = data._id
      }

      await postPhotos({
        id: id,
        images: formData.images.map(el => el.path),
      })

      onSetDefault()
    } catch (e) {
      // TODO - Add error alert
      console.error('postPublication err =>', e?.response?.data)
      captureException(e)
      setLoading(false)
    }
    setLoading(false)
  }

  const postPhotos = async ({ id, images }: TPostPhotosProps) => {
    const newImages = images.filter(el => el.includes('/'))
    const oldImages = images.filter(el => !el.includes('/'))

    try {
      await PublicationEntities.PublicationService.patchPublicationPhotos({
        id,
        images: newImages,
        oldImages: oldImages,
      })

      onNavigate()
    } catch (e) {
      // TODO - Add error alert
      captureException(e)
      setLoading(false)
    }
  }

  const onNavigate = () => {
    reset({
      index: 0,
      routes: [{ name: EScreens.CreatePublicationSuccess }],
    })
    setLoading(false)
  }

  const onPressClose = () => {
    onSetDefault()
    goBack()
  }

  const _onGoBack = () => {
    modalRef.current?.open()
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        modalRef.current?.open()

        return true
      },
    )

    return () => backHandler.remove()
  }, [])

  const onClose = () => {}

  return (
    <>
      <Header.CenterTitle
        goBack
        onGoBack={_onGoBack}
        title={t(isEdit ? 'new_publication.edit' : 'new_publication.title')}
        disableShadow
        rightIcon={'Close'}
        rightIconProps={{
          size: 18,
          stroke: EColors.grey_800,
        }}
        onPressRightIcon={_onGoBack}
      />

      <Background.Scroll
        nestedScrollEnabled
        pHorizontal={20}
        contentContainerStyle={{ paddingBottom: height + 32 }}>
        <ListFeatures.CreatePublicationForm ref={ref} />
      </Background.Scroll>

      <CustomBottomBar disableShadow getHeight={setHeight}>
        <Button.Standard
          text={t('new_publication.button')}
          opacity={0.8}
          height={'60px'}
          onPress={onGetData}
          disabled={loader}
        />
      </CustomBottomBar>

      <Modal.AcceptModal
        title={t('modal_go_back')}
        ref={modalRef}
        onPressAgree={onPressClose}
        onPressDisagree={onClose}
      />
    </>
  )
}
