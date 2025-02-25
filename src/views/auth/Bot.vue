<script setup lang="ts">
import { ref } from 'vue'
import CreateBot from '~/blocks/signal-bot/CreateBot.vue'

interface BotSettings {
  botName: string
  description: string
  apiKey: string
  apiSecret: string
  timeframeUnit: string
  multipleEntries: boolean
  swingTrade: boolean
  botStartCondition: string
  settingsFormat: string
  orderType: string
  amountType: string
  leverage: string
  percentage: string
  timeframe: string
}

const showCreateForm = ref(false)

const setShowCreateForm = (value: boolean) => {
  showCreateForm.value = value
}

const botSettings = ref<BotSettings>({
  botName: 'BOT-NAME-3cZJIE',
  description: '',
  apiKey: '',
  apiSecret: '',
  timeframeUnit: 'minute',
  multipleEntries: false,
  swingTrade: false,
  botStartCondition: 'tradingview',
  settingsFormat: 'form',
  orderType: 'market',
  amountType: 'form',
  leverage: '1',
  percentage: '20',
  timeframe: '5',
})

const botList = ref<Array<BotSettings>>([])

const deleteBot = (index: number) => {
  botList.value.splice(index, 1)
}
</script>

<template>
  <div class="w-full min-h-screen p-6">
    <div
      class="max-w-6xl mx-auto"
      v-if="!showCreateForm"
    >
      <div class="flex items-center justify-between mb-6">
        <button
          @click="setShowCreateForm(true)"
          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
          + Create bot
        </button>
      </div>
      <div class="rounded-lg">
        <div class="flex items-center justify-between mb-4">
          <div class="flex gap-2">
            <select class="bg-white border border-slate-300 rounded-md px-3 py-1 text-sm">
              <option>All exchanges</option>
            </select>
            <select class="bg-white border border-slate-300 rounded-md px-3 py-1 text-sm">
              <option>All pairs</option>
            </select>
          </div>
        </div>
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Exchange
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Timeframe
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Start Condition
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Settings
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(bot, index) in botList"
              :key="index"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                {{ bot.botName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">BINANCE FUTURES (USDT-M)</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ bot.timeframe }} {{ bot.timeframeUnit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ bot.botStartCondition }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ bot.settingsFormat }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap flex justify-between gap-x-2">
                <button
                  @click="showCreateForm = true"
                  class="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-800"
                >
                  Edit
                </button>
                <button
                  @click="deleteBot(index)"
                  class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-800"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr
              v-if="botList.length === 0"
              class="text-gray-400 text-sm"
            >
              <td
                colspan="8"
                class="text-center py-8"
              >
                No bots created yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <Modal v-model="showCreateForm">
    <template #title>
      <h1 class="text-3xl font-bold">Create Signal Bot</h1>
    </template>
    <CreateBot
      v-model="botSettings"
      v-model:bot-list="botList"
      v-model:open="showCreateForm"
    />
  </Modal>
</template>
