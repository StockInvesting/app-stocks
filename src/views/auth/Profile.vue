<script lang="ts" setup>
import { ref } from 'vue'

const user = ref({
  name: '',
  email: ''
})

const updateUser = () => {

}
</script>

<template>
  <div class="w-full min-h-screen">
    <div class="text-2xl font-bold mb-4">Meu perfil</div>
    <div class="grid grid-cols-2 gap-x-4">
      <div class="col-span-1">
        <label class="block text-sm mb-2">Nome</label>
        <input
          type="text"
          v-model="user.name"
          class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
        />
      </div>
      <div class="col-span-1">
        <label class="block text-sm mb-2">Email</label>
        <input
          type="email"
          v-model="user.email"
          class="w-full bg-white border border-[#363945] rounded-md px-4 py-3 focus:outline-none focus:border-primary"
        />
      </div>
    </div>
    <div class="mt-20">
      <button @click="updateUser" class="w-full bg-primary text-white rounded-md px-4 py-3">
        Salvar
      </button>
    </div>
  </div>
</template>
