import { Background } from '@/shared/ui/background'
import { OnboardingSlider } from '@/widgets/OnboardingSlider'
import React from 'react'
import { styles } from './styled'

export const Onboarding = () => (
  <Background.SafeArea style={styles.main}>
    <OnboardingSlider />
  </Background.SafeArea>
)
