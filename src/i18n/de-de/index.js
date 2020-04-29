import register from './register'
import login from './login'
import main from './main'
import pages from './pages'
import jobs from './jobs'
import requests from './requests'
import principles from './principles'
import getHelp from './getHelp'
import errors from './errors'
import info from './info'
import imprint from './imprint'
import profile from './profile'
import privacy from './privacy'
import search from './search'

export default {
  ...main,
  ...pages,
  ...register,
  ...login,
  ...jobs,
  ...requests,
  ...principles,
  ...getHelp,
  ...errors,
  ...info,
  ...imprint,
  ...profile,
  ...privacy,
  searchForm: { ...search }
}
