import { createRouter, createWebHistory } from 'vue-router'
import routes from '~/router/routes'
import { useAuthStore } from '~/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  const { token } = useAuthStore()

  console.log(token)

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  if (!to.meta.requiresAuth && token) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
