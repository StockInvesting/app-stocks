<script setup lang="ts">
type ButtonType = 'submit' | 'button' | 'reset'

interface Props {
  type?: ButtonType
}

const { type = 'button' } = defineProps<Props>()
</script>

<template>
  <button
    :type
    class="d-btn"
  >
    <slot />
  </button>
</template>
