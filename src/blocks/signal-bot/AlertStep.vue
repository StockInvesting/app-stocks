<script lang="ts" setup>
import type { AlertData } from '~/models/SignalBot'

const alertData = defineModel<AlertData>({ required: true })

const handleCopy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('Failed to copy text:', err)
  }
}
</script>

<template>
  <div
    class="space-y-8"
  >
    <div>
      <h2 class="text-3xl font-bold mb-4">Set up Alerts</h2>
      <a
        href="#"
        class="text-[#2962ff] hover:underline flex items-center gap-2"
      >
        <Link :size="16" />
        Signal Bot: Form Guide
      </a>
    </div>

    <div class="space-y-6">
      <div>
        <label class="block text-sm mb-2">WebHook URL</label>
        <div class="relative">
          <input
            type="text"
            v-model="alertData.webhookUrl"
            readonly
            class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
          />
          <button
            @click="() => handleCopy(alertData.webhookUrl)"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Copy :size="20" />
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm mb-2">Alert message (only for Pine Script Strategy code)</label>
        <div class="relative">
          <input
            type="text"
            v-model="alertData.alertMessage"
            readonly
            class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
          />
          <button
            @click="() => handleCopy(alertData.alertMessage)"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Copy :size="20" />
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm mb-2">Enter Long:</label>
        <div class="relative">
          <input
            type="text"
            v-model="alertData.enterLong"
            readonly
            class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
          />
          <button
            @click="() => handleCopy(alertData.enterLong)"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Copy :size="20" />
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm mb-2">Enter Short:</label>
        <div class="relative">
          <input
            type="text"
            v-model="alertData.enterShort"
            readonly
            class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
          />
          <button
            @click="() => handleCopy(alertData.enterShort)"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Copy :size="20" />
          </button>
        </div>
      </div>

      <div>
        <label class="block text-sm mb-2">Exit All:</label>
        <div class="relative">
          <input
            type="text"
            v-model="alertData.exitAll"
            readonly
            class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 pr-12 focus:outline-none focus:border-[#2962ff]"
          />
          <button
            @click="() => handleCopy(alertData.exitAll)"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <Copy :size="20" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
