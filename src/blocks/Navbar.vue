<script setup lang="ts">
import { useStorage } from '@vueuse/core'
import UserMenu from '~/blocks/UserMenu.vue'

const investOption = useStorage('invest-option', null)
</script>

<template>
  <div class="d-navbar bg-white h-12 border border-b-slate-300 flex justify-between">
    <div>
      <label
        for="sidebar"
        class="d-btn d-btn-ghost d-drawer-button lg:hidden"
      >
        <Icon icon="bx:menu" />
      </label>
      <div
        v-if="investOption"
        class="capitalize border border-slate-400 rounded px-2 p-1"
      >
        {{ investOption }}
      </div>
    </div>
    <div class="flex-none gap-2">
      <div class="d-dropdown d-dropdown-end">
        <UserMenu />
      </div>
    </div>
  </div>
</template>
