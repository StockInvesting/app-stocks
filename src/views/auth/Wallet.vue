<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { transactions } from '~/static/wallet'
import { Search } from 'lucide-vue-next'

const searchQuery = ref('')
const filteredTransactions = computed(() => {
  return transactions.filter((t: any) =>
    t.name.toLocaleLowerCase().includes(searchQuery.value.toLocaleLowerCase()),
  )
})

function getTypeIcon(value: string) {
  return value === 'cost' ? 'mdi:arrow-down' : 'mdi:arrow-up'
}

function getTypeClass(value: string) {
  return value === 'cost' ? 'text-red-600' : 'text-green-600'
}
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="w-full flex justify-between mb-8">
      <div class="h-48 bg-white rounded-lg shadow-lg w-[60%] p-8 border border-gray-200">
        <div class="flex justify-between">
          <div class="font-bold text-2xl mb-4">Saldo total</div>
          <Icon
            icon="bx:wallet"
            class="size-6"
          />
        </div>

        <div class="font-bold text-4xl mb-4">R$ 14123</div>
        <div class="flex gap-x-4">
          <div class="text-green-600">24%</div>
          <div class="text-gray-400">Últimas 24h</div>
        </div>
      </div>
      <div
        class="w-[39%] bg-white rounded-lg shadow-lg p-8 h-48 border border-gray-200 flex flex-col justify-between"
      >
        <div class="flex justify-between">
          <div class="font-bold text-2xl mb-4">Ações rápidas</div>
          <Icon
            icon="mdi:call-to-action"
            class="size-6"
          />
        </div>
        <div class="flex justify-between gap-x-2">
          <button class="bg-black/80 text-white p-2 rounded-lg w-1/3">Depositar</button>
          <button class="p-2 rounded-lg border border-gray-200 w-1/3">Retirar</button>
          <button class="bg-neutral-100 p-2 rounded-lg w-1/3 shadow">Transferir</button>
        </div>
      </div>
    </div>
    <div class="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <div class="flex justify-between">
        <div class="text-2xl my-4 font-bold">Transações</div>
        <div class="w-64">
          <div class="flex-1 max-w-md relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              :size="20"
            />
            <input
              type="text"
              placeholder="Search"
              class="w-full pl-10 pr-4 py-2 shadow bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              v-model="searchQuery"
            />
          </div>
        </div>
      </div>

      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 shadow-lg border border-gray-200">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Date
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 border border-gray-200">
          <tr
            v-for="item in filteredTransactions"
            :key="item.id"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <Icon
                :icon="getTypeIcon(item.type)"
                :class="getTypeClass(item.type)"
                class="size-6"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ item.date }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div
                :class="getTypeClass(item.type)"
                class="text-sm"
              >
                $ {{ item.value }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
