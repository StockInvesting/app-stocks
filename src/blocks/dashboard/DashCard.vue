<script lang="ts" setup>
interface Props {
  title: string
  icon: string
  body: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="h-36 col-span-4 bg-white shadow p-6 border border-gray-200 rounded">
    <div class="flex justify-between items-center text-sm mb-3">
      <span class="font-bold">{{ title }}</span>
      <Icon
        :icon
        class="size-6"
      />
    </div>
    <div class="font-[600] text-2xl">{{ body }}</div>
    <div class="text-xs text-gray-500">{{ label }}</div>
  </div>
</template>
