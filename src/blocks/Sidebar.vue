<script lang="ts" setup>
import Navbar from '~/blocks/Navbar.vue'
import Menu from '~/blocks/Menu.vue'
</script>


<template>
  <div class="d-drawer lg:d-drawer-open bg-white text-black">
    <input id="sidebar" type="checkbox" class="d-drawer-toggle" />
    <div class="d-drawer-content flex flex-col items-center justify-center bg-[#F9FAFB]">
      <Navbar />
      <slot />
    </div>
    <div class="d-drawer-side border border-r-slate-300">
      <label for="sidebar" aria-label="close sidebar" class="d-drawer-overlay"></label>
      <Menu />
    </div>
  </div>
</template>
