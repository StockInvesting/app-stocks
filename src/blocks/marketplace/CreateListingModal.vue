<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

interface ListingForm {
  name: string
  price: number | null
  exchange: string
  mode: string
  minCapital: number | null
  roi: number | null
  winRate: number | null
  maxDrawdown: number | null
  profitFactor: number | null
  description: string
}

const form = ref<ListingForm>({
  name: '',
  price: null,
  exchange: 'BINANCE FUTURES (USDT-M)',
  mode: 'Hedge Mode',
  minCapital: 200,
  roi: null,
  winRate: null,
  maxDrawdown: null,
  profitFactor: null,
  description: '',
})

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', form: ListingForm): void
}>()

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <div class="mt-4 flex items-center justify-center">
    <!-- Form -->
    <form
      @submit.prevent="handleSubmit"
    >
      <div class="space-y-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Basic Information</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Bot Name</label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g., ETH Master"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Price</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  v-model="form.price"
                  type="number"
                  min="0"
                  step="0.01"
                  class="w-full bg-white pl-8 pr-4 py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Exchange</label>
              <select
                v-model="form.exchange"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="BINANCE FUTURES (USDT-M)">BINANCE FUTURES (USDT-M)</option>
                <option value="BITGET FUTURES (USDT-M)">BITGET FUTURES (USDT-M)</option>
                <option value="PHEMEX FUTURES">PHEMEX FUTURES</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Trading Mode</label>
              <select
                v-model="form.mode"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                required
              >
                <option value="Hedge Mode">Hedge Mode</option>
                <option value="One-Way Mode">One-Way Mode</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-1"
              >Minimum Capital Required</label
            >
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
              <input
                v-model="form.minCapital"
                type="number"
                min="0"
                step="0.01"
                class="w-full bg-white pl-8 pr-4 py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="200.00"
                required
              />
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="space-y-4">
          <h3 class="text-lg font-semibold">Performance Metrics</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">ROI (%)</label>
              <input
                v-model="form.roi"
                type="number"
                step="0.01"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Win Rate (%)</label>
              <input
                v-model="form.winRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Max Drawdown (%)</label>
              <input
                v-model="form.maxDrawdown"
                type="number"
                step="0.01"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="-0.00"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-400 mb-1">Profit Factor</label>
              <input
                v-model="form.profitFactor"
                type="number"
                min="0"
                step="0.01"
                class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-400">Description</label>
          <textarea
            v-model="form.description"
            rows="4"
            class="w-full px-4 bg-white py-2 bg-gray-750 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Describe your trading bot strategy..."
            required
          ></textarea>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 flex justify-end gap-4">
        <button
          type="button"
          class="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition"
        >
          Create Listing
        </button>
      </div>
    </form>
  </div>
</template>
