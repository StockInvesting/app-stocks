<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import DashCard from '~/blocks/dashboard/DashCard.vue'
import SelectPlatformModal from '~/blocks/dashboard/SelectPlatformModal.vue'
import { getMarkets } from '~/composables/externalApi'
import { useUserStore, type InvestOption } from '~/stores/user'
import { Search } from 'lucide-vue-next'

const { investOption } = useUserStore()

const modalOpen = ref<boolean>(false)

if (!investOption) {
  modalOpen.value = true
}

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
}

const coins = ref<Coin[]>([])
const searchQuery = ref('')
const error = ref('')
const loading = ref(false)

const filteredCoins = computed(() => {
  return coins.value.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const handleError = (e: any) => {
  const errorMessage = e?.response?.data?.error || e?.message || 'An error occurred'
  error.value = errorMessage
}

const retryFetch = () => {
  error.value = ''
  fetchCoins()
}

const fetchCoins = async () => {
  try {
    loading.value = true
    const response = await getMarkets()
    coins.value = response.data
    error.value = ''
  } catch (e: any) {
    handleError(e)
  } finally {
    loading.value = false
  }
}

const formatPrice = (price: number) => {
  return price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatPercentage = (percentage: number) => {
  return percentage.toFixed(2)
}

const formatMarketCap = (marketCap: number) => {
  return (marketCap / 1000000000).toFixed(2) + 'B'
}

let refreshInterval: number

onMounted(() => {
  fetchCoins()
  refreshInterval = window.setInterval(fetchCoins, 30000)
})

onUnmounted(() => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
  }
})
</script>

<template>
  <div class="w-full">
    <div class="w-full grid grid-cols-12 gap-x-4">
      <DashCard
        title="Saldo"
        icon="prime:dollar"
        body="R$ 123,456.78"
        label="Créditos disponíveis"
      />
      <DashCard
        title="Total Bots"
        icon="hugeicons:bot"
        body="12"
        label="Bots adquiridos"
      />
      <DashCard
        title="Plano atual"
        icon="hugeicons:medal-02"
        body="Pro"
        label="Assinatura da plataforma"
      />
    </div>
    <div class="space-y-6">
      <div class="flex justify-between items-center mt-8">
        <h2 class="text-2xl font-bold">Criptomoedas</h2>
        <div class="w-64">
          <div class="flex-1 max-w-md relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              :size="20"
            />
            <input
              type="text"
              placeholder="Search"
              class="w-full pl-10 pr-4 py-2 shadow bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="searchQuery"
            />
          </div>
        </div>
      </div>

      <div
        v-if="error"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span class="block sm:inline">{{ error }}</span>
        <button
          @click="retryFetch"
          class="ml-4 text-sm underline"
        >
          Retry
        </button>
      </div>
      <div
        v-if="loading"
        class="flex justify-center py-8"
      >
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
      </div>
      <div
        v-else
        class="bg-white rounded-lg shadow-lg mt-4"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 shadow-lg">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  24h Change
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="coin in filteredCoins"
                :key="coin.id"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      :src="coin.image"
                      class="w-8 h-8 rounded-full"
                      :alt="coin.name"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ coin.name }}</div>
                      <div class="text-sm text-gray-500">{{ coin.symbol.toUpperCase() }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">${{ formatPrice(coin.current_price) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      coin.price_change_percentage_24h > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ formatPercentage(coin.price_change_percentage_24h) }}%
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${{ formatMarketCap(coin.market_cap) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <Modal
    v-model="modalOpen"
    size="max-w-lg"
  >
    <template #title> Selecione sua plataforma de Trading </template>
    <SelectPlatformModal v-model="modalOpen" />
  </Modal>
</template>
