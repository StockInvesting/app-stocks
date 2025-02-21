<script setup lang="ts">
import Sidebar from '~/blocks/Sidebar.vue'
</script>

<template>
  <Sidebar>
    <div class="w-full min-h-screen flex flex-col p-4">
      <div class="flex justify-center">
        <RouterView />
      </div>
    </div>
  </Sidebar>
</template>
