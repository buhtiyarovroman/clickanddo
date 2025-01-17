import { EScreens } from '@/app/navigation'
import { useTypedSelector } from '@/app/store'
import { TProjectResponse } from '@/entities/Projects/models'
import { ResponseCard } from '@/entities/Projects/ResponseCard'
import { getUserSelector } from '@/entities/User'
import { useNavigation } from '@/features/hooks'
import { EColors } from '@/shared/ui/Styled'
import { FlexWrapper, H3SemiBold, MRegular } from '@/shared/ui/Styled/Styled'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ListRenderItem, FlatList } from 'react-native'
import { TResponsesProjectListProps } from './types'
import { Container, styles } from './styled'
import { useGetProjectResponses } from '@/features/Projects/hooks'

export const ResponsesProjectList = ({
  id,
  hideTitle = false,
  projectName = '',
  projectSpecialist = false,
}: TResponsesProjectListProps) => {
  const { responses } = useGetProjectResponses({ id })
  const { user } = useTypedSelector(getUserSelector)
  const { t } = useTranslation()
  const [isDisabled, setIsDisabled] = useState(projectSpecialist)

  const isCustomer = user?.role === 'customer'

  const { navigate } = useNavigation()

  const isEmpty = !responses.length

  const onNavigateUser = (userId: string) => {
    navigate(EScreens.ProjectJobStack, {
      screen: EScreens.JobProfile,
      params: { id: userId },
    })
  }

  const renderItem: ListRenderItem<TProjectResponse> = ({ item }) => (
    <ResponseCard
      disableButton={isDisabled}
      projectId={id}
      {...item}
      mBottom={'16px'}
      isCustomer={isCustomer}
      onRefresh={() => setIsDisabled(true)}
      onPressUser={() => onNavigateUser(item.specialist)}
    />
  )

  const renderEmpty = () => (
    <FlexWrapper height={'100%'}>
      <MRegular color={EColors.grey_600}>{t('empty.feedback')}</MRegular>
    </FlexWrapper>
  )
  return (
    <Container>
      {!hideTitle && (
        <>
          <H3SemiBold mBottom={'10px'}>{projectName}</H3SemiBold>
          <MRegular mBottom={'16px'} color={EColors.grey_600}>
            {t('total_responses', {
              value: responses.length || 0,
            })}
          </MRegular>
        </>
      )}

      <FlatList
        keyExtractor={item => item._id}
        data={responses}
        contentContainerStyle={[isEmpty && styles.empty]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
      />
    </Container>
  )
}
