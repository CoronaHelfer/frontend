/* eslint-disable no-undef */
import hash from 'object-hash'
import ga from '../analytics'

export default ({ router, store }) => {
  router.afterEach((to, from) => {
    const sessionId = hash([store.state.auth.firstName, store.state.auth.firstName])

    ga.logPage(to.path, to.name, sessionId)
  })
}
