
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'resource/:name/:action', component: () => import('pages/resource/Index.vue') },
      { path: 'tools', component: () => import('pages/tools/Index.vue'), children: [
        { path: 'address', component: () => import('pages/tools/Address.vue') },
        { path: 'compact-message-format', component: () => import('pages/tools/CompactMessageFormat.vue') },
        { path: 'crypto', component: () => import('pages/tools/Crypto.vue') },
        { path: 'script', component: () => import('pages/tools/Script.vue') },
        { path: 'transaction', component: () => import('pages/tools/Transactions.vue') },
      ]},
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
