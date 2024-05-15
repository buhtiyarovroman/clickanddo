import React, { useEffect, useRef } from 'react'
import { Dimensions, FlatList, ListRenderItem, ViewToken } from 'react-native'
import { LocationButton, styles } from './styled'
import { TMapListProps } from './types'
import { TUser } from '@/entities/User/models'
import { TProject } from '@/entities/Projects/models'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ProjectCard } from '@/widgets/Projects/ProjectCard'
import { FlexWrapper } from '@/shared/ui/Styled/Styled'
import { Icon } from '@/shared/ui/Icon'
import { useNavigation } from '@/features/hooks'
import { EScreens } from '@/app/navigation'
import { SpecialistCard } from '@/entities/Specialist/SpecialistCard'

const { width } = Dimensions.get('window')

export const MapList = ({
  setIndex = () => {},
  index: currentIndex = 0,
  data = [],
  onShowMyLocation = () => {},
}: TMapListProps) => {
  const flatRef = useRef<FlatList | null>(null)
  const { bottom } = useSafeAreaInsets()
  const { navigate } = useNavigation()

  const viewConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  })

  const onGoProject = (project: TProject) => {
    navigate(EScreens.HomeJobStackScreen, {
      screen: EScreens.JobMain,
      params: {
        project,
      },
    })
  }

  const onGoSpecialistProfile = (userId: string) => {
    navigate(EScreens.HomeJobStackScreen, {
      screen: EScreens.JobProfile,
      params: {
        id: userId,
      },
    })
  }

  const renderItem: ListRenderItem<TUser | TProject> = ({ item, index }) => {
    const isFirstM = index === 0 ? '16px' : '0px'
    const currentWidth = width * 0.9 + 'px'

    if ('dateOfBirth' in item) {
      let user: TUser = item

      return (
        <SpecialistCard
          mLeft={isFirstM}
          mRight={'16px'}
          width={currentWidth}
          onPress={() => onGoSpecialistProfile(item._id)}
          item={user}
        />
      )
    } else if ('relevantUntil' in item) {
      let project: TProject = item
      return (
        <ProjectCard
          width={currentWidth}
          mLeft={isFirstM}
          mRight={'16px'}
          disableButtons
          project={project}
          onPress={() => onGoProject(project)}
          showDates
        />
      )
    }

    return <></>
  }

  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
      if (typeof viewableItems[0]?.index === 'number') {
        setIndex(viewableItems[0].index)
      }
    },
  ).current

  useEffect(() => {
    flatRef.current?.scrollToIndex({
      animated: false,
      index: currentIndex,
    })
  }, [currentIndex])

  return (
    <FlexWrapper
      flexDirection={'column'}
      style={[styles.main, { bottom: bottom + 16 }]}>
      <FlexWrapper
        style={styles.horizontal}
        mBottom={'16px'}
        justify={'flex-end'}>
        {/* Get my Location button */}
        <LocationButton onPress={onShowMyLocation}>
          <Icon name={'MapPinUserFill'} size={28} />
        </LocationButton>
      </FlexWrapper>

      {!!data.length && (
        <FlatList
          ref={flatRef}
          keyExtractor={item => item._id}
          data={data}
          renderItem={renderItem}
          pagingEnabled
          horizontal
          decelerationRate={'fast'}
          keyboardShouldPersistTaps={'handled'}
          snapToInterval={width * 0.945}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={1}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={viewableItemsChanged}
          onScrollToIndexFailed={info => {
            setTimeout(() => {
              flatRef.current?.scrollToIndex({
                index: info.index,
                animated: false,
              })
            }, 500)
          }}
          bounces={false}
        />
      )}
    </FlexWrapper>
  )
}
