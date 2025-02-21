<script setup lang="ts">
import { menuList } from '~/static/menu'
import logo from '~/assets/stock-logo.png'
</script>

<template>
  <ul class="d-menu bg-white min-h-full w-72 p-4">
    <div class="flex justify-center mb-12">
      <img
        :src="logo"
        class="w-40"
        alt="stock-logo"
      />
    </div>
    <li
      v-for="{ icon, to, label } in menuList"
      :key="to"
      class="mb-2"
    >
      <RouterLink :to>
        <Icon
          :icon
          class="mr-4 size-6"
        />
        {{ label }}
      </RouterLink>
    </li>
  </ul>
</template>
