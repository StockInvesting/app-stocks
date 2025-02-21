<script lang="ts" setup>
import type { Bot } from '~/models/Marketplace'

interface Props {
  bot: Bot
}

defineProps<Props>()

const followBot = (bot: Bot) => {
  console.log('Following bot:', bot.name)
}
</script>

<template>
  <div
    class="bg-white w-full shadow rounded-lg py-4 px-4 hover:bg-gray-750 transition cursor-pointer"
  >
    <div class="flex items-center gap-3 mb-4">
      <img
        :src="bot.avatar"
        :alt="bot.trader"
        class="w-10 h-10 rounded-full"
      />
      <div>
        <h3 class="font-semibold">{{ bot.trader }}</h3>
        <p class="text-sm text-gray-400">{{ bot.name }}</p>
      </div>
      <div class="ml-auto">
        <span class="text-sm font-medium">{{ bot.price }}</span>
      </div>
    </div>

    <div class="flex items-center gap-2 text-sm text-gray-400 mb-3">
      <Binance :size="16" />
      <span>{{ bot.exchange }}</span>
    </div>

    <div class="flex items-center gap-2 text-sm text-gray-400 mb-4">
      <Clock :size="16" />
      <span>{{ bot.mode }}</span>
    </div>

    <div class="mb-4">
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm text-gray-400">Period ROI</span>
        <span class="text-emerald-400 font-semibold">{{ bot.roi }}%</span>
      </div>
      <div class="h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          class="h-full bg-emerald-400 rounded-full"
          :style="{ width: `${Math.min(bot.roi, 100)}%` }"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-sm text-gray-400">
        <Users :size="16" />
        <span>{{ bot.followers }} Followers</span>
      </div>
      <button
        class="px-4 py-2 bg-primary/85 rounded-lg hover:bg-green-800 transition"
        @click.stop="followBot(bot)"
      >
        Follow
      </button>
    </div>
  </div>
</template>
