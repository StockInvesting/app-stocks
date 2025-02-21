const routes = [
  {
    path: '',
    component: () => import('~/layouts/BlankLayout.vue'),
    meta: { requiresAuth: false },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('~/views/guest/Login.vue')
      }
    ]
  },
  {
    path: '',
    component: () => import('~/layouts/Layout.vue'),
    meta: { requiresAuth: true },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('~/views/auth/Dashboard.vue'),
        alias: '/'
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('~/views/auth/Profile.vue')
      },
      {
        path: '/tradeview',
        name: 'tradeview',
        component: () => import('~/views/auth/Tradeview.vue')
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('~/views/auth/News.vue')
      },
      {
        path: '/wallet',
        name: 'wallet',
        component: () => import('~/views/auth/Wallet.vue')
      },
      {
        path: '/bot',
        name: 'bot',
        component: () => import('~/views/auth/Bot.vue')
      },
      {
        path: '/marketplace',
        name: 'marketplace',
        component: () => import('~/views/auth/marketplace/List.vue')
      },
      {
        path: '/marketplace/:id',
        name: 'view-marketplace-bot',
        component: () => import('~/views/auth/marketplace/Details.vue')
      }
    ]
  }
]

export default routes
