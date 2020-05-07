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
import profile from './profile'
import imprint from './imprint'
import privacy from './privacy'
import search from './search'
import help from './help'

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
  ...profile,
  ...imprint,
  ...privacy,
  ...help,
  searchForm: { ...search }
}
