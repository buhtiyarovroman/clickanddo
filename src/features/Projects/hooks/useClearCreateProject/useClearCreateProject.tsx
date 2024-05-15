import { projectsActions } from '@/entities/Projects/store'
import { useNavigation } from '@/features/hooks'
import { useDispatch } from 'react-redux'
import { TUseClearCreateProjectProps } from './types'
import { CommonActions } from '@react-navigation/native'

export const useClearCreateProject = ({
  stack,
}: TUseClearCreateProjectProps) => {
  const dispatch = useDispatch()
  const { dispatch: navigationDispatch } = useNavigation()

  const onClearNavigate = () => {
    dispatch(projectsActions.clearProjectCreate())

    navigationDispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: stack }],
      }),
    )
  }

  return {
    onClearNavigate,
  }
}
