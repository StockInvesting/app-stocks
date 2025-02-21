<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, Grid, List, Filter, Binary as Binance, Clock, Users } from 'lucide-vue-next'
import BotDetailsModal from '~/blocks/marketplace/BotDetailsModal.vue'
import CreateListingModal from '~/blocks/marketplace/CreateListingModal.vue'
import type { Bot, ListingForm } from '~/models/Marketplace'
import { initialBots } from '~/static/marketplace/bots'
import router from '~/router'
import BotCard from '~/blocks/marketplace/BotCard.vue'

const viewMode = ref<'grid' | 'list'>('grid')
const showBotDetails = ref(false)
const showCreateListing = ref(false)

const initialBot = {
  id: '',
  name: '',
  trader: '',
  exchange: '',
  mode: '',
  roi: 0,
  price: '',
  followers: 0,
  avatar: '',
}
const selectedBot = ref<Bot>(initialBot)
const bots = ref<Array<Bot>>(initialBots)
const search = ref<string>()

const openBotDetails = (bot: Bot) => {
  if (!bot) {
    return
  }

  router.push(`/marketplace/${bot.id}`)
}

const closeBotDetails = () => {
  showBotDetails.value = false
  selectedBot.value = initialBot
}

const closeCreateListing = () => {
  showCreateListing.value = false
}

const handleCreateListing = (form: ListingForm) => {
  const newBot: Bot = {
    id: (bots.value.length + 1).toString(),
    name: form.name,
    trader: 'Current User',
    exchange: form.exchange,
    mode: form.mode,
    roi: form.roi || 0,
    price: form.price ? `$${form.price.toFixed(2)}/month` : 'Free',
    followers: 0,
    avatar: 'https://images.unsplash.com/photo-1636716642701-01a9df2fc5e1?w=150&h=150&fit=crop',
  }

  bots.value = [...bots.value, newBot]
  showCreateListing.value = false
}

watch(search, () => {
  const lowercaseSearchTerm = search.value ? search.value.toLowerCase() : ''
  bots.value = initialBots.filter((bot) =>
    bot.name.toLowerCase().includes(lowercaseSearchTerm) ||
    bot.trader.toLowerCase().includes(lowercaseSearchTerm) ||
    bot.exchange.toLowerCase().includes(lowercaseSearchTerm)
  )
})

</script>

<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="px-4 py-2">
      <div class="container mx-auto flex items-center justify-between">
        <h1 class="text-2xl font-bold">Marketplace</h1>
        <div class="flex items-center gap-4">
          <button
            class="px-4 py-2 bg-white border border-primary rounded-lg hover:bg-slate-200 transition"
            @click="showCreateListing = true"
          >
            Create Listing
          </button>
          <button class="px-4 py-2 bg-primary/75 rounded-lg hover:bg-green-800 transition">
            Get Notifications
          </button>
        </div>
      </div>
    </header>

    <!-- Filters -->
    <div class="container mx-auto p-4">
      <div class="flex flex-wrap gap-4 items-center justify-between mb-6">
        <div class="flex-1 max-w-md relative">
          <Search
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            :size="20"
          />
          <input
            type="text"
            placeholder="Search trader"
            class="w-full pl-10 pr-4 py-2 shadow bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            v-model="search"
          />
        </div>

        <div class="flex gap-2">
          <button class="p-2 bg-white shadow rounded-lg hover:bg-gray-700">
            <Filter :size="20" />
          </button>
          <select class="bg-white shadow rounded-lg px-3 py-2">
            <option>All pairs</option>
          </select>
          <select class="bg-white shadow rounded-lg px-3 py-2">
            <option>All Timeframes</option>
          </select>
          <select class="bg-white shadow rounded-lg px-3 py-2">
            <option>All exchanges</option>
          </select>
          <div class="flex gap-1 bg-white rounded-lg p-1">
            <button
              class="p-1 rounded"
              :class="{ 'bg-primary text-white': viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <Grid :size="20" />
            </button>
            <button
              class="p-1 rounded"
              :class="{ 'bg-primary text-white': viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <List :size="20" />
            </button>
          </div>
        </div>
      </div>

      <!-- Bot Grid -->
      <div
        class="grid gap-4"
        :class="
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'
            : 'grid-cols-1'
        "
      >
        <BotCard
          v-for="bot in bots"
          :key="bot.id"
          :bot
          @click="openBotDetails(bot)"
        />
      </div>
    </div>

    <!-- Bot Details Modal -->
    <BotDetailsModal
      :show="showBotDetails"
      :bot="selectedBot"
      @close="closeBotDetails"
    />
    <!-- Create Listing Modal -->
    <Modal v-model="showCreateListing">
      <template #title>
        <h2 class="text-2xl font-bold">Create Bot Listing</h2>
      </template>
      <CreateListingModal
        :show="showCreateListing"
        @close="closeCreateListing"
        @submit="handleCreateListing"
      />
    </Modal>
  </div>
</template>
