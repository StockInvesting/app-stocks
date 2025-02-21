<script lang="ts" setup>
import { newsList } from '~/static/news'
import { Search } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const searchQuery = ref('')

const filteredNews = computed(() => newsList.filter((item) => item.title.toLowerCase().includes(searchQuery.value.toLowerCase())),)
</script>

<template>
  <div class="w-full flex flex-col">
    <div class="flex justify-between mb-8 w-full">
      <div class="text-2xl font-bold ml-8">News</div>
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
    <div class="flex gap-12 flex-wrap justify-center">
      <div
        v-for="item in filteredNews"
        :key="item.title"
        class="h-96 w-96 bg-white border border-gray-200 rounded-lg cursor-pointer"
      >
        <div>
          <img
            :src="item.image"
            alt="default-image"
            class="h-48 w-96 object-cover"
          />
        </div>
        <div class="p-3">
          <div class="bg-black rounded-full px-4 text-white max-w-44 text-center text-sm">
            {{ item.category }}
          </div>
          <div class="mt-4 text-xl font-bold">
            {{ item.title }}
          </div>
          <div class="text-gray-600 text-sm flex items-center h-full">
            {{ item.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
