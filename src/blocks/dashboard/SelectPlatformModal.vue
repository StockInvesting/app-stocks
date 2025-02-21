<script setup lang="ts">
import { useUserStore, type InvestOption } from '~/stores/user'
import logoBinance from '~/assets/logo-binance.svg'
import logoAvenue from '~/assets/logo-avenue.svg'

const { setInvestOption } = useUserStore()

const modalOpen = defineModel<boolean>({ required: true })

function chooseInvestOption(value: InvestOption) {
  setInvestOption(value)
  modalOpen.value = false
}
</script>


<template>
  <div class="w-full flex justify-around mt-12">
    <div
      class="size-48 border-2 border-slate-200 hover:border-green-600 hover:shadow-md rounded-lg transition cursor-pointer"
      @click="chooseInvestOption('binance')"
    >
      <div class="flex justify-center mt-12">
        <img
          :src="logoBinance"
          alt="logo-binance"
        />
      </div>
      <div class="text-center text-slate-700 mt-8">Criptomoedas</div>
    </div>
    <div
      class="size-48 border-2 border-slate-200 hover:border-green-600 hover:shadow-md rounded-lg transition cursor-pointer"
      @click="chooseInvestOption('avenue')"
    >
      <div class="flex justify-center mt-12">
        <img
          :src="logoAvenue"
          alt="logo-avenue"
        />
      </div>
      <div class="text-center text-slate-700 mt-8">Mercado de ações <br />americano</div>
    </div>
  </div>
</template>
