import { categoriesWatcher } from '@/entities/Category'
import { chatWatcher } from '@/entities/Chat/store'
import { notificationsWatcher } from '@/entities/Notifications/store/saga'
import { projectsWatcher } from '@/entities/Projects/store'
import { publicationWatcher } from '@/entities/Publication'
import { userWatcher } from '@/entities/User'
import { all } from 'redux-saga/effects'

//Configure your saga

function* rootSaga() {
  yield all([
    userWatcher(),
    publicationWatcher(),
    categoriesWatcher(),
    projectsWatcher(),
    chatWatcher(),
    notificationsWatcher(),
  ])
}

export default rootSaga
