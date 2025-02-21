<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { isClickOutsideElement } from '~/utils/clickOutside'

interface Props {
  size?: string
}

const { size = 'max-w-3xl' } = defineProps<Props>()

const open = defineModel()

const openModalClass = computed(() => open.value && 'd-modal-open')

function toggleModal() {
  open.value = !open.value
}

const modal = ref()

function handleClickOutside(e: MouseEvent) {
  if (!open.value || !modal) {
    return
  }

  if (isClickOutsideElement(modal.value, e)) {
    toggleModal()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div
    :class="openModalClass"
    class="d-modal"
  >
    <div
      :class="size"
      class="d-modal-box bg-secondary"
      ref="modal"
    >
      <div class="d-modal-header flex justify-between">
        <div class="text-xl font-bold">
          <slot name="title" />
        </div>
        <Icon
          icon="bx:x"
          class="text-2xl cursor-pointer"
          @click="toggleModal"
        />
      </div>
      <slot />
      <div class="d-modal-actions mt-8">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
