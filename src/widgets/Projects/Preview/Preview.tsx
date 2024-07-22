import React from 'react'
import { Components } from './ui'
import { TProjectPreviewProps } from './types'
import { Hr } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { ContentContainer } from './styled'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProjectEntities } from '@/entities/Projects'
import { ProjectSlider } from '@/shared/ui/ProjectSlider'

export const Preview = (data: TProjectPreviewProps) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <View style={{ paddingBottom: bottom + 16 }}>
      {!!data.images?.length && <ProjectSlider {...data} />}

      <ContentContainer>
        <ProjectEntities.MainInfo isCreate {...data} />

        <Hr mTop={'20px'} mBottom={'20px'} color={EColors.grey_400} />

        <ProjectEntities.AdditionalService {...data} />

        <ProjectEntities.AdditionalInfo {...data} />

        <Components.Buttons {...data} />
      </ContentContainer>
    </View>
  )
}
