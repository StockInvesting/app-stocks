<script lang="ts" setup>
import type { AlertData } from '~/models/SignalBot'
import { Copy, Link, Check, AlertCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const alertData = defineModel<AlertData>({ required: true })
const copiedField = ref<string | null>(null)
const showCopiedMessage = ref(false)

const handleCopy = async (text: string, field: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedField.value = field
    showCopiedMessage.value = true
    setTimeout(() => {
      showCopiedMessage.value = false
      copiedField.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}

const testWebhook = async () => {
  try {
    const response = await fetch(alertData.value.webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: true,
        message: 'Teste de webhook',
      }),
    })
    if (response.ok) {
      alert('Webhook testado com sucesso!')
    } else {
      alert('Erro ao testar webhook. Verifique a URL.')
    }
  } catch (error) {
    alert('Erro ao testar webhook. Verifique a URL.')
  }
}
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-3xl font-bold mb-4">Configuração de Alertas</h2>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <AlertCircle :size="16" />
        <span>Configure os alertas para receber notificações sobre as operações do seu bot</span>
      </div>
    </div>

    <div class="space-y-6">
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Webhook</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">URL do Webhook</label>
            <div class="relative">
              <input
                type="text"
                v-model="alertData.webhookUrl"
                class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-24 focus:outline-none focus:border-[#2962ff]"
              />
              <div class="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <button
                  @click="testWebhook"
                  class="text-[#2962ff] hover:text-[#2962ff]/80"
                >
                  Testar
                </button>
                <button
                  @click="() => handleCopy(alertData.webhookUrl, 'webhook')"
                  class="text-gray-400 hover:text-white"
                >
                  <Copy :size="20" />
                </button>
              </div>
            </div>
            <div v-if="copiedField === 'webhook' && showCopiedMessage" class="mt-2 text-sm text-green-500 flex items-center gap-1">
              <Check :size="16" />
              Copiado!
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold mb-4">Mensagens de Alerta</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm mb-2">Mensagem de Alerta (Pine Script)</label>
            <div class="relative">
              <input
                type="text"
                v-model="alertData.alertMessage"
                class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                @click="() => handleCopy(alertData.alertMessage || '', 'message')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Copy :size="20" />
              </button>
            </div>
            <div v-if="copiedField === 'message' && showCopiedMessage" class="mt-2 text-sm text-green-500 flex items-center gap-1">
              <Check :size="16" />
              Copiado!
            </div>
          </div>

          <div>
            <label class="block text-sm mb-2">Entrada Longa</label>
            <div class="relative">
              <input
                type="text"
                v-model="alertData.enterLong"
                class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                @click="() => handleCopy(alertData.enterLong || '', 'long')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Copy :size="20" />
              </button>
            </div>
            <div v-if="copiedField === 'long' && showCopiedMessage" class="mt-2 text-sm text-green-500 flex items-center gap-1">
              <Check :size="16" />
              Copiado!
            </div>
          </div>

          <div>
            <label class="block text-sm mb-2">Entrada Curta</label>
            <div class="relative">
              <input
                type="text"
                v-model="alertData.enterShort"
                class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                @click="() => handleCopy(alertData.enterShort, 'short')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Copy :size="20" />
              </button>
            </div>
            <div v-if="copiedField === 'short' && showCopiedMessage" class="mt-2 text-sm text-green-500 flex items-center gap-1">
              <Check :size="16" />
              Copiado!
            </div>
          </div>

          <div>
            <label class="block text-sm mb-2">Sair de Todas as Posições</label>
            <div class="relative">
              <input
                type="text"
                v-model="alertData.exitAll"
                class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
              />
              <button
                @click="() => handleCopy(alertData.exitAll, 'exit')"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <Copy :size="20" />
              </button>
            </div>
            <div v-if="copiedField === 'exit' && showCopiedMessage" class="mt-2 text-sm text-green-500 flex items-center gap-1">
              <Check :size="16" />
              Copiado!
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-4">
        <button
          @click="$emit('back')"
          class="px-6 py-2 border border-[#363945] rounded-md hover:bg-gray-100"
        >
          Voltar
        </button>
        <button
          @click="$emit('complete')"
          class="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
        >
          Finalizar
        </button>
      </div>
    </div>
  </div>
</template>
