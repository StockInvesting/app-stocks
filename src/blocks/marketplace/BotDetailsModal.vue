<script setup lang="ts">
import { X, LineChart } from 'lucide-vue-next'

interface Bot {
  id: string
  name: string
  trader: string
  exchange: string
  mode: string
  roi: number
  price: string
  followers: number
  avatar: string
}

defineProps<{
  show: boolean
  bot: Bot
}>();

defineEmits<{
  (e: 'close'): void
}>();
</script>

<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gray-800 rounded-lg w-full max-w-5xl mx-4 overflow-hidden">
      <!-- Header -->
      <div class="p-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <img :src="bot.avatar" :alt="bot.trader" class="w-16 h-16 rounded-full" />
            <div>
              <h2 class="text-2xl font-bold">{{ bot.name }}</h2>
              <p class="text-gray-400">by {{ bot.trader }}</p>
            </div>
          </div>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white">
            <X :size="24" />
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Left Column - Basic Info -->
          <div class="space-y-6">
            <div class="bg-gray-750 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Bot Information</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Price</span>
                  <span class="font-medium">{{ bot.price }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Exchange</span>
                  <span class="font-medium">{{ bot.exchange }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Mode</span>
                  <span class="font-medium">{{ bot.mode }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-400">Min. Capital</span>
                  <span class="font-medium">$200.00</span>
                </div>
              </div>
            </div>

            <div class="bg-gray-750 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Community</h3>
              <div class="flex items-center justify-between">
                <span class="text-gray-400">Followers</span>
                <span class="font-medium">{{ bot.followers }}</span>
              </div>
            </div>
          </div>

          <!-- Middle Column - Stats -->
          <div class="lg:col-span-2 space-y-6">
            <div class="bg-gray-750 p-4 rounded-lg">
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Period ROI</h4>
                  <p class="text-2xl font-bold text-emerald-400">{{ bot.roi }}%</p>
                </div>
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Profit Factor</h4>
                  <p class="text-2xl font-bold">2.15</p>
                </div>
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Win Rate</h4>
                  <p class="text-2xl font-bold">98.65%</p>
                </div>
              </div>
            </div>

            <!-- Performance Chart -->
            <div class="bg-gray-750 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Performance</h3>
              <div class="h-64 flex items-center justify-center text-gray-400">
                <LineChart :size="32" />
                <span class="ml-2">Chart visualization would go here</span>
              </div>
            </div>

            <!-- Trading Stats -->
            <div class="bg-gray-750 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Trading Statistics</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Total Trades</h4>
                  <p class="text-lg font-medium">371</p>
                </div>
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Avg Time in Trade</h4>
                  <p class="text-lg font-medium">9h 42m</p>
                </div>
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Max Drawdown</h4>
                  <p class="text-lg font-medium text-red-400">-0.65%</p>
                </div>
                <div>
                  <h4 class="text-sm text-gray-400 mb-1">Max Gain</h4>
                  <p class="text-lg font-medium text-emerald-400">1.18%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-700">
        <div class="flex justify-end gap-4">
          <button
            class="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Follow Bot
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
