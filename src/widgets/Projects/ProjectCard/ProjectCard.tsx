import React from 'react'
import { ProjectContainer } from './styled'
import { TProjectCartProps } from './types'
import { Head, Dates, Content } from './ui'
import { Statuses } from './ui/Statuses'

export const ProjectCard = React.memo(
  ({
    project,
    width = '100%',
    showDates = false,
    showStatus = false,
    ...props
  }: TProjectCartProps) => (
    <ProjectContainer width={width} {...props}>
      {/* name and control project */}
      <Head project={project} {...props} showDates={showDates} />

      {/* Dates start end and relevant */}
      {showDates && <Dates {...project} />}

      {showStatus && <Statuses {...project} />}

      {/* Buttons for change status and end project */}
      <Content {...project} {...props} />
    </ProjectContainer>
  ),
)
