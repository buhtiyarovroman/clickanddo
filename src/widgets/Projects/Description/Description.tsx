import React from 'react'
import { TProjectPreviewProps } from './types'
import { Hr } from '@/shared/ui/Styled/Styled'
import { EColors } from '@/shared/ui/Styled'
import { ContentContainer } from './styled'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProjectEntities } from '@/entities/Projects'
import { ResponsesSeen } from '@/entities/Projects/ResponsesSeen'
import { FeedbackButton, HoldButtons } from './ui'
import { Background } from '@/shared/ui/background'
import { ProjectSlider } from '@/shared/ui/ProjectSlider'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'

export const Description = ({
  onRefresh = () => {},
  project,
  onGoProfile,
}: TProjectPreviewProps) => {
  const { bottom } = useSafeAreaInsets()

  return (
    <Background.Scroll
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + TAB_HEIGHT + 16 }}>
      <ProjectSlider images={project?.images} />

      <ContentContainer isGallery={!!project?.images.length}>
        <ProjectEntities.MainInfo {...project} onGoProfile={onGoProfile} />

        <Hr mTop={'20px'} mBottom={'20px'} color={EColors.grey_400} />

        {/* <ProjectEntities.AdditionalService {...project} /> */}

        <ProjectEntities.AdditionalInfo {...project} />

        <Hr mTop={'20px'} mBottom={'20px'} color={EColors.grey_400} />

        <ResponsesSeen {...project} />

        <FeedbackButton {...project} onRefresh={onRefresh} />

        <HoldButtons project={project} onRefresh={onRefresh} />
      </ContentContainer>
    </Background.Scroll>
  )
}
