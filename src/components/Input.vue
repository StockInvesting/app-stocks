<script setup lang="ts">
import type { HTMLInputType } from '~/models/Input'

interface Props {
  type?: HTMLInputType
  placeholder?: string
}

const { type = 'text' } = defineProps<Props>()
const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    :type
    :placeholder
    class="input input-bordered bg-white border border-slate-400 focus:outline-yellow-600 rounded p-2 w-full"
  />
</template>
