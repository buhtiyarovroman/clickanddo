import { useCallback, useContext, useEffect } from 'react'
import { EScreens } from './screens'
import { EStacks } from './stacks'
import { ETab, ETabStacks } from './tabs'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import { Platform } from 'react-native'
import firebaseService from '@/features/Auth/firebase.service'
import { useAuthNavigate } from '@/features/User/hooks'
import { LoaderContext } from '../contexts/Loader'
import { useNavigation } from '@/features/hooks'
import { publicationActions, PublicationEntities } from '@/entities/Publication'
import { useDispatch } from 'react-redux'
import { EDrawerStackScreens } from './drawer/types'

export const HandleDeepLinking = () => {
  const navigation = useNavigation()
  const { onInitialGetUser } = useAuthNavigate()
  const { setLoading } = useContext(LoaderContext)
  const dispatch = useDispatch()

  const onGetPublication = async (id: string) => {
    try {
      setLoading(true)

      const response =
        await PublicationEntities.PublicationService.getPublicationById({
          id,
        })

      return response.data
    } catch (err) {
      console.log('HandleDeepLinking onGetPublication err =>', err)
    } finally {
      setLoading(false)
    }
  }

  const extractInfo = useCallback(
    (
      url: string,
    ): {
      id?: string
      type?: string
    } | null => {
      const regex = /type=([^&]+)&id=([^&]+)/
      const match = url.match(regex)

      if (match) {
        const type = match[1]
        const id = match[2]

        return { id, type }
      }

      return null
    },
    [],
  )

  const handleDynamicLink = useCallback(async (link: any) => {
    // console.log('link', link)
    let currentLink: string = link?.url || ''

    console.log('LINK currentLink =>', currentLink)

    if (!!currentLink) {
      if (firebaseService.isSignInWithEmailLink(currentLink)) {
        await firebaseService.afterSignInWithEmail(currentLink)

        await onInitialGetUser()
      }

      const info = extractInfo(currentLink)

      if (info) {
        if (!info.id && !info.type) return

        if (info.type === 'publication') {
          //Find publication by link id
          const publication = await onGetPublication(info.id!)

          if (!publication) {
            //TODO: make a toast for "Publication not found"
            return
          }

          //set in storages
          dispatch(
            publicationActions.setState({ singlePublication: publication }),
          )

          navigation.navigate(EStacks.Drawer, {
            screen: EDrawerStackScreens.TabStack,
            params: {
              screen: ETabStacks.List,
              params: {
                screen: EScreens.ListPublicationStack,
                params: {
                  screen: EScreens.PublicationScreen,
                  params: {
                    type: publication.type,
                    id: publication._id,
                  },
                },
                initial: false,
              },
            },
          })
        }
      }
    } else {
      // navigation.navigate(ETab.Main)
    }
  }, [])

  useEffect(() => {
    if (Platform.OS === 'ios') {
      dynamicLinks().onLink(handleDynamicLink)
    } else {
      dynamicLinks().onLink(handleDynamicLink)
      dynamicLinks().getInitialLink().then(handleDynamicLink)
    }
  }, [])

  return null
}
