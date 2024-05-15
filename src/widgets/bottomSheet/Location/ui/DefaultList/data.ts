import { TFunction } from 'i18next'
import { TDefaultListData } from './types'

export const onGetData = (t: TFunction<any>): TDefaultListData[] => [
  {
    title: t('location_list.nearby'),
    radius: 5000,
    visibleRadius: '< ' + t('km', { value: 5 }),
    isMyLocation: true,
    icon: 'Fire',
    needTranslate: true,
  },
  {
    title: t('location_list.neighbors'),
    isMyLocation: true,
    visibleRadius: '< ' + t('km', { value: 10 }),
    radius: 10000,
    icon: 'Houses',
    needTranslate: true,
  },
  {
    title: t('location_list.city'),
    isMyLocation: true,
    visibleRadius: '< ' + t('km', { value: 25 }),
    radius: 25000,
    icon: 'City',
    needTranslate: true,
  },
  {
    title: t('location_list.city_region'),
    isMyLocation: true,
    visibleRadius: '< ' + t('km', { value: 50 }),
    radius: 50000,
    icon: 'Motorway',
    needTranslate: true,
  },
  {
    title: t('location_list.nearest_distant'),
    isMyLocation: true,
    visibleRadius: '< ' + t('km', { value: 150 }),
    radius: 150000,
    icon: 'RailwayTrack',
    needTranslate: true,
  },
  {
    title: t('location_list.whole_world'),
    isMyLocation: true,
    icon: 'OutPlanet',
    needTranslate: true,
  },
  {
    title: t('location_list.kyiv'),
    location: [50.449807, 30.51701],
    icon: 'Ukraine',
  },
  {
    title: t('location_list.london'),
    location: [51.507124, -0.125499],
    icon: 'UnitedKingdom',
  },
  {
    title: t('location_list.paris'),
    location: [48.85749, 2.347799],
  },
  {
    title: t('location_list.madrid'),
    location: [40.416462, -3.705037],
  },
  {
    title: t('location_list.berlin'),
    location: [52.519073, 13.403115],
  },
  {
    title: t('location_list.rome'),
    location: [41.902681, 12.496247],
    icon: 'Italy',
  },
]
