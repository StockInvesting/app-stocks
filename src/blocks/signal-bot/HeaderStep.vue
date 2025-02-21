<script lang="ts" setup>
const currentStep = defineModel<number>({ required: true})
</script>

<template>
  <div class="relative mt-4">
    <div class="flex justify-between items-center relative z-10">
      <div class="flex flex-col items-center">
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold bg-primary"
        >
          {{ currentStep > 1 ? '✓' : '1' }}
        </div>
        <span :class="['mt-2', currentStep === 1 ? 'text-white' : 'text-white']">Settings</span>
      </div>
      <div class="flex flex-col items-center">
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold',
            currentStep === 2 ? 'bg-primary' : 'bg-[#363945]',
          ]"
        >
          2
        </div>
        <span :class="['mt-2', currentStep === 2 ? 'text-white' : 'text-gray-400']">Alerts</span>
      </div>
    </div>
    <div class="absolute top-5 left-0 w-full h-[2px] bg-[#363945] -z-0">
      <div
        :class="[
          'h-full bg-primary transition-all duration-300',
          currentStep === 1 ? 'w-1/2' : 'w-full',
        ]"
      ></div>
    </div>
  </div>
</template>
