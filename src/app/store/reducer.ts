import { userReducer } from '@/entities/User'
import { combineReducers } from '@reduxjs/toolkit'
import { EStoreReducer } from './types'
import { categoriesReducer } from '@/entities/Category'
import { publicationReducer } from '@/entities/Publication'
import { projectsReducer } from '@/entities/Projects/store'
import { specialOfferReducer } from '@/entities/SpecialOffer'
import { skillBoxReducer } from '@/entities/Skillbox'
import { chatReducer } from '@/entities/Chat/store'
import { favoritesReducer } from '@/entities/Favorites/store'
import { NotificationsReducer } from '@/entities/Notifications/store'

//Configure your reducers
export default combineReducers({
  [EStoreReducer.user]: userReducer,
  [EStoreReducer.categories]: categoriesReducer,
  [EStoreReducer.publication]: publicationReducer,
  [EStoreReducer.projects]: projectsReducer,
  [EStoreReducer.specialOffer]: specialOfferReducer,
  [EStoreReducer.skillBox]: skillBoxReducer,
  [EStoreReducer.chat]: chatReducer,
  [EStoreReducer.favorites]: favoritesReducer,
  [EStoreReducer.notifications]: NotificationsReducer,
})
