import { View } from 'react-native'
import styled from 'styled-components'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { EColors } from '@/shared/ui/Styled'

export const ContentContainer = styled(View)`
  flex: 1;
  align-items: center;
`

export const StyledBottomSheetModal = styled(BottomSheetModal)`
  background-color: ${EColors.white};
`
