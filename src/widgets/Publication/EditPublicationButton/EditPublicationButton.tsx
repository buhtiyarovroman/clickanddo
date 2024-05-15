import React from 'react'
import { t } from 'i18next'

import { TEditPublicationButtonProps, TNavigationScreens } from './types'
import { Button } from '@/shared/ui/button'
import { EPublicationType } from '@/entities/Publication/models'
import { EScreens } from '@/app/navigation'
import { publicationActions } from '@/entities/Publication'
import { useDispatch } from 'react-redux'
import {
  formatDataCreatePublication,
  formatDataCreateSkillBox,
  formatDataCreateSpecialOffer,
} from './helpers'
import { skillBoxActions } from '@/entities/Skillbox/store/actions'
import { useNavigation } from '@/features/hooks'
import { specialOfferActions } from '@/entities/SpecialOffer/store/actions'
import { PublicationService } from '@/entities/Publication/services'

export const EditPublicationButton = ({
  publication,
  type,
}: TEditPublicationButtonProps) => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const navigationScreen: TNavigationScreens = {
    [EPublicationType.publication]: EScreens.ListCreatePublication,
    [EPublicationType.skillbox]: EScreens.ListCreateSkillBox,
    [EPublicationType.specialOffer]: EScreens.ListSpecialOffer,
  }

  const onPressEdit = async () => {
    const { data: newPublication } =
      await PublicationService.getPublicationById({
        id: publication._id,
        currency: publication.currency,
      })

    if (type === 'publication') {
      dispatch(
        publicationActions.setState({
          createPublication: formatDataCreatePublication({
            ...publication,
            price: Math.round(newPublication.price),
          }),
        }),
      )
    }

    if (type === 'special-offer') {
      dispatch(
        specialOfferActions.setSpecialOfferFields(
          formatDataCreateSpecialOffer({
            ...publication,
            maxPrice: Math.round(newPublication.maxPrice),
            minPrice: Math.round(newPublication.minPrice),
          }),
        ),
      )

      navigate(EScreens.ListSpecialOffer, {
        screen: EScreens.SpecialOfferCreateFirst,
      })

      return
    }

    if (type === 'skillbox') {
      dispatch(
        skillBoxActions.setState({
          createSkillBox: formatDataCreateSkillBox({
            ...publication,
            price: newPublication.price,
            oldPrice: newPublication.oldPrice,
          }),
        }),
      )
      navigate(EScreens.ListCreateSkillBox, {
        screen: EScreens.CreateSkillBoxFirst,
      })

      return
    }

    navigate(navigationScreen[type])
  }

  return <Button.Standard text={t('edit')} onPress={onPressEdit} />
}
