import { EColors } from '@/shared/ui/Styled'
import { FLEX } from '@/shared/ui/utils'
import { StyleSheet, View } from 'react-native'
import styled from 'styled-components'
export const styles = StyleSheet.create({
  container: {
    width: '48%',
    padding: 16,
    borderWidth: 1,
    borderColor: EColors.grey_600,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  first_row: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 12,
  },
  actions_wrapper: {
    marginLeft: 16,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  action: {
    backgroundColor: EColors.transparent,
    width: 32,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: EColors.grey_600,
  },
  second_action: {
    backgroundColor: EColors.transparent,
    width: 32,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: EColors.grey_600,
  },
  rating: {
    borderRadius: 3,
    width: 'auto',
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 1,
    bottom: 5,
    right: 7,
    backgroundColor: EColors.white,
  },
})

export const InvalidContainer = styled(View)`
  width: 100%;
  background-color: ${EColors.grey_200};
  border-radius: 8px;
  padding: 7px 0px;

  ${FLEX({})}
`
