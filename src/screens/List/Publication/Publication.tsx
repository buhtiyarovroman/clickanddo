import React, { useContext, useEffect, useRef } from 'react'
import { ScrollView, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useRoute } from '@react-navigation/native'

import { EScreens } from '@/app/navigation'
import { Header } from '@/widgets/header'
import { PublicationWidgets } from '@/widgets/Publication'
import { UserSpecialistFeatures } from '@/features/User/Specialist'
import { FlexWrapper, LSemibold } from '@/shared/ui/Styled/Styled'
import { styles } from './styles'
import { useTypedSelector } from '@/app/store'
import { getUserSelector } from '@/entities/User'
import {
  getPublicationSelector,
  publicationActions,
} from '@/entities/Publication'
import { TAB_HEIGHT } from '@/widgets/BottomTab/useAnimatedTab'
import { TPublicationStack } from '@/app/navigation/stacks/Publication'
import { useDispatch } from 'react-redux'
import { LoaderContext } from '@/app/contexts/Loader'
import { ProjectSlider } from '@/shared/ui/ProjectSlider'
import { EColors } from '@/shared/ui/Styled'
import { useNavigation } from '@/features/hooks'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const Publication = () => {
  const { t } = useTranslation()
  const scrollRef = useRef<KeyboardAwareScrollView>(null)
  const dispatch = useDispatch()
  const { push } = useNavigation()
  const { setLoading } = useContext(LoaderContext)
  const { user, setting } = useTypedSelector(getUserSelector)
  const { singlePublication: publication } = useTypedSelector(
    getPublicationSelector,
  )
  const { type, id: publicationId } =
    useRoute<RouteProp<TPublicationStack, EScreens.PublicationScreen>>().params

  const contentTopRef = useRef<ScrollView | null>(null)

  const goTop = () => {
    contentTopRef.current?.scrollTo({ x: 0, y: 0, animated: true })
  }
  const isCustomer = user?.role === 'customer'

  const onGetPublication = () => {
    dispatch(
      publicationActions.getSinglePublicationRequest({
        id: publicationId,
        currency: setting.currency,
      }),
    )
  }

  //get publication
  useEffect(() => {
    onGetPublication()

    return () => {
      dispatch(publicationActions.clearSinglePublication())
    }
  }, [])

  //start loader if we dont have a poblication in storage
  useEffect(() => {
    if (!publication) {
      setLoading(true)

      return
    }

    setLoading(false)
  }, [publication])

  useEffect(() => {
    goTop()
  }, [publication?._id])

  const onNavigatePress = () => {
    // scrollRef.current?.scrollToEnd()
    scrollRef.current?.scrollToPosition(0, 0, true)
  }

  return (
    <>
      <Header.CenterTitle disableShadow goBack title={publication?.heading} />
      <KeyboardAwareScrollView
        ref={scrollRef}
        extraHeight={150}
        style={{ backgroundColor: EColors.white }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: TAB_HEIGHT + 16,
        }}>
        {publication && (
          <>
            <ProjectSlider
              images={publication.images}
              imageType={'publication'}
            />

            <View style={styles.content_container}>
              {isCustomer && (
                <PublicationWidgets.Owner id={publication.owner} />
              )}

              <PublicationWidgets.Info type={type} publication={publication} />

              <PublicationWidgets.Actions
                type={type}
                onGetPublication={onGetPublication}
                publication={publication}
              />

              <PublicationWidgets.Comments id={publication._id} />

              <FlexWrapper style={styles.list_wrapper}>
                <LSemibold style={styles.title}>
                  {t('same_publications')}
                </LSemibold>

                {type === 'publication' && (
                  <UserSpecialistFeatures.Publications
                    hideIfEmpty
                    disableTitle
                    _id={publication.owner}
                    onNavigatePress={onNavigatePress}
                  />
                )}

                {type === 'skillbox' && (
                  <UserSpecialistFeatures.SkillBox
                    hideIfEmpty
                    withTitle={false}
                    _id={publication.owner}
                  />
                )}

                {type === 'special-offer' && (
                  <UserSpecialistFeatures.SpecialOffers
                    withTitle={false}
                    _id={publication.owner}
                    hideIfEmpty
                  />
                )}
              </FlexWrapper>
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </>
  )
}
