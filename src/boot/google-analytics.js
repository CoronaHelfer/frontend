/* eslint-disable no-undef */
import hash from 'object-hash'
import ga from '../analytics'

export default ({ router, store }) => {
  router.afterEach((to, from) => {
    let sessionId

    if (!store.state.auth.id) {
      const persistedSessionId = localStorage.getItem('session-id')

      if (!persistedSessionId) {
        const newSessionId = `${Date.now()}.${Math.random() * (1000000 - 1) + 1}`
        localStorage.setItem('session-id', newSessionId)
        sessionId = newSessionId
      } else {
        sessionId = persistedSessionId
      }
    } else {
      sessionId = hash(store.state.auth.id)
    }

    ga.logPage(to.path, to.name, sessionId)
  })
}
