
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'flyer', component: () => import('pages/Flyer.vue') },
      { path: 'information', component: () => import('pages/Information.vue') },
      { path: 'contact', component: () => import('pages/Contact.vue') },
      { path: 'login', component: () => import('pages/Login.vue') }
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
