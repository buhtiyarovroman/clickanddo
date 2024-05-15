import { EColors, Styled } from '@/shared/ui/Styled'
import { StyleSheet, Text, View } from 'react-native'
import styled from 'styled-components'

export const Container = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Title = styled(Styled.Text)`
  font-size: 11px;
  margin-top: 7px;
`

export const CounterText = styled(Text)`
  font-size: 12px;
  line-height: 13px;
  color: ${EColors.white};
`

export const CountContainer = styled(View)`
  width: 18px;
  height: 18px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  align-self: flex-end;
  padding-left: 1px;
  border: 2px solid ${EColors.white};
  top: -5px;

  z-index: 10;
  border-radius: 100px;
  background-color: ${EColors.error};
`

export const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 5,
  },
  text: {
    lineHeight: 13,
  },
})
