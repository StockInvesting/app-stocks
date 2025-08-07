<script setup lang="ts">
import { ref } from 'vue'
import Step from '~/blocks/signal-bot/HeaderStep.vue'
import { Search, Info, ChevronDown, Eye, EyeOff, Link, Copy, ArrowLeft } from 'lucide-vue-next'
import AlertStep from '~/blocks/signal-bot/AlertStep.vue'
import type { Exits } from '~/models/SignalBot'
import ExitsSection from '~/blocks/signal-bot/ExitsSection.vue'
import RadioSection from '~/blocks/signal-bot/RadioSection.vue'

const currentStep = ref(1)
const showApiSecret = ref(false)

const botSettings = defineModel<any>({ required: true })
const botList = defineModel<any>('bot-list')
const open = defineModel<any>('open')

// Configurações adicionais
const riskManagement = ref({
  maxOpenPositions: 3,
  maxDailyLoss: 5,
  maxDrawdown: 10,
  positionSize: 100,
})

// Notificações
const notifications = ref({
  telegram: false,
  email: false,
  discord: false,
  webhook: true,
})

// Exit settings
const exits = ref<Exits>({
  takeProfit: false,
  stopLoss: false,
  moveStopLoss: false,
  trailingStop: false,
  reduceOnly: true,
  dca: false,
})

// Alert data
const alertData = ref({
  webhookUrl: 'https://wtalerts.com/bot/trading_view',
  alertMessage: '{{strategy.order.comment}}',
  enterLong: 'ENTER-LONG_BINANCE_1000BONKUSDT_BOT-NAME-3cZJIE_5M_9bff86e8bb39c2c54e',
  enterShort: 'ENTER-SHORT_BINANCE_1000BONKUSDT_BOT-NAME-3cZJIE_5M_9bff86e8bb39c2c54e',
  exitAll: 'EXIT-ALL_BINANCE_1000BONKUSDT_BOT-NAME-3cZJIE_5M_9bff86e8bb39c2c54e',
})

const toggleApiSecret = () => {
  showApiSecret.value = !showApiSecret.value
}

const incrementTimeframe = () => {
  botSettings.value.timeframe = String(Number(botSettings.value.timeframe) + 1)
}

const decrementTimeframe = () => {
  if (Number(botSettings.value.timeframe) > 1) {
    botSettings.value.timeframe = String(Number(botSettings.value.timeframe) - 1)
  }
}

const handleCreateBot = () => {
  // Validação dos campos obrigatórios
  if (!botSettings.value.botName || !botSettings.value.apiKey || !botSettings.value.apiSecret) {
    alert('Por favor, preencha todos os campos obrigatórios')
    return
  }
  currentStep.value = 2
}

const handleBack = () => {
  currentStep.value = 1
}

const handleComplete = () => {
  botList.value.push(botSettings.value)
  open.value = false
}
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <Step v-model="currentStep" />
    <div class="rounded-lg px-8">
      <div
        v-if="currentStep === 1"
        class="space-y-8"
      >
        <div>
          <h2 class="text-3xl font-bold mb-6">Configurações Gerais</h2>
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm mb-2">Nome do Bot <span class="text-red-500">*</span></label>
                <input
                  type="text"
                  v-model="botSettings.botName"
                  placeholder="Digite um nome para seu bot"
                  class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label class="block text-sm mb-2">Descrição</label>
                <input
                  type="text"
                  v-model="botSettings.description"
                  placeholder="Descreva a estratégia do seu bot"
                  class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm mb-2">Exchange</label>
              <div
                class="flex items-center justify-between border border-[#363945] rounded-md px-4 py-3"
              >
                <div class="flex items-center gap-2">
                  <img
                    src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
                    alt="Binance"
                    class="w-6 h-6"
                  />
                  <span>BINANCE FUTURES (USDT-M)</span>
                  <span class="text-xs px-2 py-1 rounded text-[#00b8b9]">DEMO</span>
                </div>
                <ChevronDown
                  :size="20"
                  class="text-gray-400"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <label class="text-sm">API Credentials</label>
                <Info
                  :size="16"
                  class="text-gray-400"
                />
              </div>
              <div class="space-y-3">
                <div>
                  <label class="block text-sm text-gray-400 mb-1">API Key</label>
                  <input
                    type="text"
                    v-model="botSettings.apiKey"
                    placeholder="Enter your API key"
                    class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-400 mb-1">API Secret</label>
                  <div class="relative">
                    <input
                      :type="showApiSecret ? 'text' : 'password'"
                      v-model="botSettings.apiSecret"
                      placeholder="Enter your API secret"
                      class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      @click="toggleApiSecret"
                      class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <component
                        :is="showApiSecret ? EyeOff : Eye"
                        :size="20"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <label class="text-sm">Pairs</label>
                <Info
                  :size="16"
                  class="text-gray-400"
                />
              </div>
              <div class="relative">
                <Search
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  :size="20"
                />
                <input
                  type="text"
                  placeholder="Search"
                  class="w-full bg-white border border-[#363945] rounded-md pl-12 pr-4 py-3 focus:outline-none focus:border-primary"
                />
                <ChevronDown
                  :size="20"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <div>
              <div class="flex items-center gap-2 mb-2">
                <label class="text-sm">Timeframe</label>
                <Info
                  :size="16"
                  class="text-gray-400"
                />
              </div>
              <div class="flex gap-2">
                <div class="relative w-32">
                  <input
                    type="number"
                    v-model="botSettings.timeframe"
                    class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                  <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                    <button
                      class="text-gray-400 hover:text-white"
                      @click="incrementTimeframe"
                    >
                      ▲
                    </button>
                    <button
                      class="text-gray-400 hover:text-white"
                      @click="decrementTimeframe"
                    >
                      ▼
                    </button>
                  </div>
                </div>
                <select
                  v-model="botSettings.timeframeUnit"
                  class="bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                >
                  <option value="minute">Minute</option>
                  <option value="hour">Hour</option>
                  <option value="day">Day</option>
                </select>
              </div>
            </div>
            <div class="space-y-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="botSettings.multipleEntries"
                  class="hidden"
                />
                <div
                  :class="[
                    'w-6 h-6 rounded border flex items-center justify-center',
                    botSettings.multipleEntries
                      ? 'bg-primary border-primary'
                      : 'border-[#363945]',
                  ]"
                >
                  <span
                    v-if="botSettings.multipleEntries"
                    class="text-white"
                    >✓</span
                  >
                </div>
                <span>Multiple entries</span>
                <Info
                  :size="16"
                  class="text-gray-400"
                />
              </label>

              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  v-model="botSettings.swingTrade"
                  class="hidden"
                />
                <div
                  :class="[
                    'w-6 h-6 rounded border flex items-center justify-center',
                    botSettings.swingTrade ? 'bg-primary border-primary' : 'border-[#363945]',
                  ]"
                >
                  <span
                    v-if="botSettings.swingTrade"
                    class="text-white"
                    >✓</span
                  >
                </div>
                <span>Swing trade</span>
                <Info
                  :size="16"
                  class="text-gray-400"
                />
              </label>
            </div>
            <RadioSection v-model="botSettings"/>
            <ExitsSection v-model="exits" />
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Gerenciamento de Risco</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm mb-2">Posições Máximas Abertas</label>
                  <input
                    type="number"
                    v-model="riskManagement.maxOpenPositions"
                    class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-2">Perda Máxima Diária (%)</label>
                  <input
                    type="number"
                    v-model="riskManagement.maxDailyLoss"
                    class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-2">Drawdown Máximo (%)</label>
                  <input
                    type="number"
                    v-model="riskManagement.maxDrawdown"
                    class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label class="block text-sm mb-2">Tamanho da Posição (USDT)</label>
                  <input
                    type="number"
                    v-model="riskManagement.positionSize"
                    class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">Notificações</h3>
              <div class="grid grid-cols-2 gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notifications.telegram"
                    class="hidden"
                  />
                  <div
                    :class="[
                      'w-6 h-6 rounded border flex items-center justify-center',
                      notifications.telegram
                        ? 'bg-primary border-primary'
                        : 'border-[#363945]',
                    ]"
                  >
                    <span v-if="notifications.telegram" class="text-white">✓</span>
                  </div>
                  <span>Telegram</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notifications.email"
                    class="hidden"
                  />
                  <div
                    :class="[
                      'w-6 h-6 rounded border flex items-center justify-center',
                      notifications.email
                        ? 'bg-primary border-primary'
                        : 'border-[#363945]',
                    ]"
                  >
                    <span v-if="notifications.email" class="text-white">✓</span>
                  </div>
                  <span>Email</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notifications.discord"
                    class="hidden"
                  />
                  <div
                    :class="[
                      'w-6 h-6 rounded border flex items-center justify-center',
                      notifications.discord
                        ? 'bg-primary border-primary'
                        : 'border-[#363945]',
                    ]"
                  >
                    <span v-if="notifications.discord" class="text-white">✓</span>
                  </div>
                  <span>Discord</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="notifications.webhook"
                    class="hidden"
                  />
                  <div
                    :class="[
                      'w-6 h-6 rounded border flex items-center justify-center',
                      notifications.webhook
                        ? 'bg-primary border-primary'
                        : 'border-[#363945]',
                    ]"
                  >
                    <span v-if="notifications.webhook" class="text-white">✓</span>
                  </div>
                  <span>Webhook</span>
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-4">
              <button
                @click="open = false"
                class="px-6 py-2 border border-[#363945] rounded-md hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                @click="handleCreateBot"
                class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
              >
                Próximo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <AlertStep v-model="alertData" />
        <div class="flex gap-4 mt-4">
          <button
            @click="handleBack"
            class="flex items-center gap-2 px-6 py-3 rounded-md border border-[#363945] hover:bg-[#2c2f3a] transition-colors"
          >
            <ArrowLeft :size="20" />
            Back
          </button>
          <button
            @click="handleComplete"
            class="flex-1 bg-primary text-white py-3 rounded-md hover:bg-green-800 transition-colors"
          >
            I have set my alert!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
