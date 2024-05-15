import { EProjectTypes, EProjectCardType } from '../ProjectCard/types'

export const transformBackendType = (isCustomer: boolean) => {
  const active = isCustomer
    ? [
        `${EProjectTypes.searching}`,
        `${EProjectTypes.in_progress}`,
        `${EProjectTypes.mark_done}`,
        `${EProjectTypes.pending_specialist}`,
      ]
    : [`${EProjectTypes.in_progress}`, `${EProjectTypes.mark_done}`]

  const completed = [
    `${EProjectTypes.done}`,
    `${EProjectTypes.canceled_by_owner}`,
    ...(isCustomer ? [] : [`${EProjectTypes.hold}`]),
  ]

  return {
    [EProjectCardType.requisitions]: [
      `${EProjectTypes.searching}`,
      `${EProjectTypes.pending_specialist}`,
    ],
    [EProjectCardType.active]: [...active],
    [EProjectCardType.graft]: [
      `${EProjectTypes.hold}`,
      `${EProjectTypes.rejected_by_specialist}`,
    ],
    [EProjectCardType.in_progress]: [],
    [EProjectCardType.completed]: completed,
  }
}
