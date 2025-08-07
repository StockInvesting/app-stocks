<script lang="ts" setup>
import { Info, AlertCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const botSettings = defineModel<any>({ required: true })

const tradingModes = [
  {
    id: 'spot',
    name: 'Spot',
    description: 'Operações no mercado à vista',
    icon: '💰',
  },
  {
    id: 'futures',
    name: 'Futuros',
    description: 'Operações com alavancagem',
    icon: '📈',
  },
]

const orderTypes = [
  {
    id: 'market',
    name: 'Mercado',
    description: 'Execução imediata ao preço atual',
    icon: '⚡',
  },
  {
    id: 'limit',
    name: 'Limitada',
    description: 'Execução quando o preço atingir o valor especificado',
    icon: '🎯',
  },
]

const selectedMode = ref('futures')
const selectedOrderType = ref('market')
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-3xl font-bold mb-4">Configurações de Trading</h2>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <AlertCircle :size="16" />
        <span>Configure o modo de operação e tipo de ordem</span>
      </div>
    </div>

    <div class="space-y-6">
      <!-- Modo de Trading -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Modo de Trading</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="mode in tradingModes"
            :key="mode.id"
            class="relative"
          >
            <input
              type="radio"
              :id="mode.id"
              v-model="selectedMode"
              :value="mode.id"
              class="hidden"
            />
            <label
              :for="mode.id"
              class="block p-4 border rounded-lg cursor-pointer transition-all"
              :class="[
                selectedMode === mode.id
                  ? 'border-primary bg-primary/5'
                  : 'border-[#363945] hover:border-primary/50',
              ]"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ mode.icon }}</span>
                <div>
                  <div class="font-medium">{{ mode.name }}</div>
                  <div class="text-sm text-gray-500">{{ mode.description }}</div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Tipo de Ordem -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Tipo de Ordem</h3>
        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="type in orderTypes"
            :key="type.id"
            class="relative"
          >
            <input
              type="radio"
              :id="type.id"
              v-model="selectedOrderType"
              :value="type.id"
              class="hidden"
            />
            <label
              :for="type.id"
              class="block p-4 border rounded-lg cursor-pointer transition-all"
              :class="[
                selectedOrderType === type.id
                  ? 'border-primary bg-primary/5'
                  : 'border-[#363945] hover:border-primary/50',
              ]"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ type.icon }}</span>
                <div>
                  <div class="font-medium">{{ type.name }}</div>
                  <div class="text-sm text-gray-500">{{ type.description }}</div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Configurações Adicionais -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Configurações Adicionais</h3>
        <div class="space-y-4">
          <div>
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
                <span v-if="botSettings.multipleEntries" class="text-white">✓</span>
              </div>
              <span class="font-medium">Múltiplas Entradas</span>
              <Info :size="16" class="text-gray-400" />
            </label>
          </div>

          <div>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="botSettings.swingTrade"
                class="hidden"
              />
              <div
                :class="[
                  'w-6 h-6 rounded border flex items-center justify-center',
                  botSettings.swingTrade
                    ? 'bg-primary border-primary'
                    : 'border-[#363945]',
                ]"
              >
                <span v-if="botSettings.swingTrade" class="text-white">✓</span>
              </div>
              <span class="font-medium">Swing Trade</span>
              <Info :size="16" class="text-gray-400" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
