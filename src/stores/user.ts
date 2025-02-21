import type { RemovableRef } from '@vueuse/core'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { useGet } from '~/composables/api'

export type InvestOption = 'binance' | 'avenue'

interface State {
  investOption: RemovableRef<InvestOption | null>
}

const useUserStore = defineStore('User', {
  state: (): State => ({
    investOption: useStorage('invest-option', null),
  }),
  actions: {
    me() {
      return useGet('/users')
    },
    setInvestOption(option: InvestOption) {
      this.$state.investOption = option
    },
    removeInvestOption() {
      this.$state.investOption = null
    },
  },
})

export { useUserStore }
