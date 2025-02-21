<script lang="ts" setup>
import type { BotSettings } from '~/models/SignalBot'

const botSettings = defineModel<BotSettings>({ required: true })
</script>

<template>
  <!-- Bot Start Condition -->
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <h3 class="text-lg font-semibold">Bot start condition</h3>
      <Info
        :size="16"
        class="text-gray-400"
      />
    </div>
    <div class="flex gap-4">
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.botStartCondition"
          value="tradingview"
          class="d-radio d-radio-primary"
        />
        <span>TradingView Alert</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.botStartCondition"
          value="runbot"
          class="d-radio d-radio-primary"
        />
        <span>RunBot Alert</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.botStartCondition"
          value="api"
          class="d-radio d-radio-primary"
        />
        <span>API request</span>
      </label>
    </div>
  </div>

  <!-- Bot Settings Format -->
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <h3 class="text-lg font-semibold">Bot settings format</h3>
      <Info
        :size="16"
        class="text-gray-400"
      />
    </div>
    <div class="flex gap-4">
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.settingsFormat"
          value="form"
          class="d-radio d-radio-primary"
        />
        <span>Form settings</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.settingsFormat"
          value="json"
          class="d-radio d-radio-primary"
        />
        <span>JSON</span>
      </label>
    </div>
  </div>

  <!-- Order Type -->
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">Order type</h3>
    <div class="flex gap-4">
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.orderType"
          value="market"
          class="d-radio d-radio-primary"
        />
        <span>Market</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.orderType"
          value="limit"
          class="d-radio d-radio-primary"
        />
        <span>Limit</span>
      </label>
    </div>
  </div>

  <!-- Amount per trade -->
  <div class="space-y-4">
    <div class="flex items-center gap-2">
      <h3 class="text-lg font-semibold">Amount per trade</h3>
      <Info
        :size="16"
        class="text-gray-400"
      />
    </div>
    <div class="flex gap-4">
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.amountType"
          value="form"
          class="d-radio d-radio-primary"
        />
        <span>Form settings</span>
      </label>
      <label class="flex items-center gap-2">
        <input
          type="radio"
          v-model="botSettings.amountType"
          value="custom"
          class="d-radio d-radio-primary"
        />
        <span>Custom quantity</span>
      </label>
    </div>
    <div
      v-if="botSettings.amountType === 'form'"
      class="space-y-4"
    >
      <div class="flex items-center gap-2">
        <input
          type="number"
          v-model="botSettings.percentage"
          class="w-24 bg-white border border-[#363945] rounded-md px-4 py-2 focus:outline-none focus:border-[#2962ff]"
        />
        <span>%</span>
      </div>
      <div class="space-y-2">
        <label class="text-sm text-gray-400">Leverage</label>
        <div class="flex items-center gap-2">
          <input
            type="number"
            v-model="botSettings.leverage"
            class="w-24 bg-white border border-[#363945] rounded-md px-4 py-2 focus:outline-none focus:border-[#2962ff]"
          />
          <span>x</span>
        </div>
      </div>
    </div>
  </div>
</template>
