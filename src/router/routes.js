const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'information',
        name: 'Information',
        component: () => import('pages/Information.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Login.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/Register.vue')
      },
      {
        path: 'imprint',
        name: 'Imprint',
        component: () => import('pages/Imprint.vue')
      },
      {
        path: 'jobs',
        name: 'Jobs',
        component: () => import('pages/Jobs.vue')
      },
      {
        path: 'privacy',
        name: 'Privacy',
        component: () => import('pages/Privacy.vue')
      },
      {
        path: 'help',
        name: 'Help',
        component: () => import('pages/Help.vue')
      },
      {
        path: 'get-help',
        name: 'GetHelp',
        component: () => import('pages/GetHelp.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('pages/Profile.vue')
      },
      {
        path: 'press',
        name: 'Press',
        component: () => import('pages/Press.vue')
      },
      {
        path: 'offers',
        name: 'Offers',
        component: () => import('pages/OffersForMyRequest.vue')
      },
      {
        path: 'verify',
        name: 'Verify',
        component: () => import('pages/Verify.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: '404',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
