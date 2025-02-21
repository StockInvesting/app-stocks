import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { usePost } from '~/composables/api'


interface State {
  token: RemovableRef<string | null>
}

const useAuthStore = defineStore('Auth', {
  state: (): State => ({
    token: useStorage('stocks_token', null),
  }),
  actions: {
    loginWithGoogle(data: unknown) {
      return usePost('/auth/google/login', data)
    },
    login(data: unknown) {
      return usePost('/auth/login', data)
    },
    setToken(token: string) {
      this.$state.token = token
    },
    removeToken() {
      this.$state.token = null
    },
  },
})

export { useAuthStore }
