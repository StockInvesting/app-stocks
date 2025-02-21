<script lang="ts" setup>
import type { Exits } from '~/models/SignalBot'

const exits = defineModel<Exits>({ required: true })
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-xl font-semibold">Exits</h3>
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span>Take Profit</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="exits.takeProfit"
            class="d-toggle d-toggle-primary"
          />
        </label>
      </div>
      <div class="flex items-center justify-between">
        <span>Stop Loss</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="exits.stopLoss"
            class="d-toggle d-toggle-primary"
          />
        </label>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>Move Stop Loss to breakeven</span>
          <Info
            :size="16"
            class="text-gray-400"
          />
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="exits.moveStopLoss"
            class="d-toggle d-toggle-primary"
          />
        </label>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>Trailing Stop</span>
          <Info
            :size="16"
            class="text-gray-400"
          />
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="exits.trailingStop"
            class="d-toggle d-toggle-primary"
          />
        </label>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span>Reduce only</span>
          <Info
            :size="16"
            class="text-gray-400"
          />
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            v-model="exits.reduceOnly"
            class="d-toggle d-toggle-primary"
          />
        </label>
      </div>
    </div>
  </div>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold">DCA</h3>
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          v-model="exits.dca"
          class="d-toggle d-toggle-primary"
        />
      </label>
    </div>
  </div>
</template>
