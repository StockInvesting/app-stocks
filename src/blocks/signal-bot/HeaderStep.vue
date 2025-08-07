<script lang="ts" setup>
import { Check, AlertCircle } from 'lucide-vue-next'

const currentStep = defineModel<number>({ required: true })

const steps = [
  {
    id: 1,
    title: 'Configurações Gerais',
    description: 'Configure as informações básicas do seu bot',
  },
  {
    id: 2,
    title: 'Alertas',
    description: 'Configure os alertas para receber notificações',
  },
]
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div
          v-for="step in steps"
          :key="step.id"
          class="flex items-center gap-4"
        >
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors"
            :class="[
              currentStep >= step.id
                ? 'border-primary bg-primary text-white'
                : 'border-[#363945] text-gray-400',
            ]"
          >
            <Check
              v-if="currentStep > step.id"
              :size="16"
            />
            <span v-else>{{ step.id }}</span>
          </div>
          <div class="hidden md:block">
            <div class="font-medium">{{ step.title }}</div>
            <div class="text-sm text-gray-500">{{ step.description }}</div>
          </div>
          <div
            v-if="step.id < steps.length"
            class="hidden md:block w-24 h-0.5"
            :class="[
              currentStep > step.id
                ? 'bg-primary'
                : 'bg-[#363945]',
            ]"
          />
        </div>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <AlertCircle :size="16" />
        <span>Passo {{ currentStep }} de {{ steps.length }}</span>
      </div>
    </div>
  </div>
</template>
