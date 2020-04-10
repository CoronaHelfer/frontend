
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'information', component: () => import('pages/Information.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'imprint', component: () => import('pages/Imprint.vue') },
      { path: 'privacy', component: () => import('pages/Privacy.vue') },
      { path: 'help', component: () => import('pages/Help.vue') },
      { path: 'get-help', component: () => import('pages/GetHelp.vue') },
      { path: 'profile', component: () => import('pages/Profile.vue') },
      { path: 'profile/requests', component: () => import('pages/MyRequests.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
