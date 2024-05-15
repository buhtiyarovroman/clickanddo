import { StyleSheet, TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { EColors } from '../../Styled'
import { TIconsKeys } from '@assets/Svg'

export const ClearButtonWrapper = styled(TouchableOpacity)`
  width: 15%;
  position: absolute;
  right: 0;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const LeftButtonWrapper = styled(View)`
  width: 15%;
  z-index: 100;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: ${EColors.grey_200};

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`

export const IconContainer = styled(View)<{ leftIcon: TIconsKeys }>`
  background-color: ${({ leftIcon }) =>
    leftIcon === 'Planet' ? EColors.primary_L1 : EColors.transparent};
  padding: 9px;
  border-radius: 7px;
`

export const autocompleteStyles = StyleSheet.create({
  disabled: {
    opacity: 0.4,
  },
  container: {
    zIndex: 100,
  },
  textInputContainer: {
    height: 52,
    flexDirection: 'row',
    width: '100%',
  },
  listView: {
    elevation: 1,
    maxHeight: 200,
  },
  textInput: {
    paddingRight: '15%',
    height: 52,
    width: '100%',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 12,
    fontSize: 16,
    // flex: 1,
  },
  row: {
    height: 52,
    flexDirection: 'row',
    zIndex: 100,
  },
  separator: {
    height: 1,
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 20,
  },
})
