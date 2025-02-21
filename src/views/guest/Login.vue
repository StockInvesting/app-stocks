<script setup lang="ts">
import logo from '~/assets/stock-logo.png'
import { googleTokenLogin } from 'vue3-google-login'
import { useAuthStore } from '~/stores/auth'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import router from '~/router'

const { loginWithGoogle, login, setToken } = useAuthStore()

const user = ref({
  email: '',
  password: '',
})

async function handleGoogleLogin() {
  const { access_token } = await googleTokenLogin()

  const { execute } = loginWithGoogle({ access_token })

  execute().then((response: any) => {
    console.log(response)
  })
}

function handleSubmit(e: Event) {
  e.preventDefault()

  const { execute, data } = login(user.value)

  execute().then(() => {
    const token = data.value.data.access_token

    console.log(token)

    setToken(token)
    router.replace({ name: 'dashboard' })
  })
}
</script>

<template>
  <div class="min-h-[100vh] min-w-[100vw] flex justify-center items-center bg-white/95">
    <div class="w-[440px] h-[480px] shadow-2xl rounded-lg bg-white">
      <div class="flex justify-center">
        <img
          :src="logo"
          class="w-72"
          alt="stock-logo"
        />
      </div>
      <form
        class="grid grid-cols-12 gap-y-4 mx-12 mb-4"
        @submit="(e: Event) => handleSubmit(e)"
      >
        <div class="col-span-12">
          <label class="text-sm">E-mail</label>
          <Input
            v-model="user.email"
            type="email"
          />
        </div>
        <div class="col-span-12">
          <label class="text-sm">Senha</label>
          <Input
            v-model="user.password"
            type="password"
          />
        </div>
        <div class="col-span-12 mt-2">
          <Button
            type="submit"
            class="w-full d-btn-primary text-white"
          >
            Entrar
          </Button>
        </div>
      </form>
      <div class="text-center mb-4">- ou -</div>
      <div class="w-full flex flex-col">
        <div
          class="flex items-center p-2 mx-12 text-sm border border-slate-300 rounded cursor-pointer"
          @click="handleGoogleLogin"
        >
          <Icon
            icon="flat-color-icons:google"
            class="size-6 mr-2"
          />
          <div class="text-center w-full">Fazer login com o Google</div>
        </div>
      </div>
    </div>
  </div>
</template>
