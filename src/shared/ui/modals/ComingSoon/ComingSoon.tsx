import React, { forwardRef } from 'react'
import { TComingSoonModalProps } from './types'
import { TStandardModalRef } from '../Standard/types'
import { Modal } from '..'
import { H2 } from '../../Styled/Styled'
import { useTranslation } from 'react-i18next'
import { StyledModalView } from './styled'
import { Icon } from '../../Icon'

export const ComingSoon = forwardRef<TStandardModalRef, TComingSoonModalProps>(
  ({}, ref) => {
    const { t } = useTranslation()
    return (
      <Modal.Standard ref={ref}>
        <StyledModalView>
          <H2>{t('coming_soon')}</H2>

          <Icon name={'ComingSoon'} size={300} />
        </StyledModalView>
      </Modal.Standard>
    )
  },
)
