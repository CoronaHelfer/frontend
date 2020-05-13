/* eslint-disable no-undef */
import ga from '../analytics'

export default ({ router, store }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, store.state.auth.id)
  })
}
