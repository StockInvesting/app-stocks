<script setup lang="ts">
import { ref } from 'vue'
import CreateBot from '~/blocks/signal-bot/CreateBot.vue'

const showCreateForm = ref(false)

const setShowCreateForm = (value: boolean) => {
  showCreateForm.value = value
}
</script>

<template>
  <div class="w-full min-h-screen p-6">
    <div class="max-w-6xl mx-auto" v-if="!showCreateForm">
      <div class="flex items-center justify-between mb-6">
        <button
          @click="setShowCreateForm(true)"
          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-green-800"
        >
          + Create bot
        </button>
      </div>

      <!-- Bot List Table -->
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

        <table class="w-full">
          <thead>
            <tr class="text-gray-800 text-sm border-b border-[#363945]">
              <th class="text-left py-2">Status</th>
              <th class="text-left py-2">Exchange</th>
              <th class="text-left py-2">Pairs</th>
              <th class="text-left py-2">Time</th>
              <th class="text-left py-2">Settings</th>
              <th class="text-left py-2">DCA Settings</th>
              <th class="text-left py-2">Enabled</th>
              <th class="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-gray-400 text-sm">
              <td colspan="8" class="text-center py-8">No bots created yet</td>
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
    <CreateBot />
  </Modal>
</template>
