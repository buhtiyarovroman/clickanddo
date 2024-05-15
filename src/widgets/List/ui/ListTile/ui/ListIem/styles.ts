import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { StyleSheet } from 'react-native'
import styled from 'styled-components'

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 12,
  },
  image: {
    height: undefined,
    width: '100%',
    borderRadius: 20,
  },
  icon_wrapper: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 2,
  },
})

export const AbsoluteLocation = styled(FlexWrapper).attrs({
  justify: 'flex-start',
})`
  width: 80%;
  background-color: ${EColors.white};
  padding: 8px 10px;
  position: absolute;
  bottom: 10px;
  z-index: 1000000;
  border-radius: 12px;
`
