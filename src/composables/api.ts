/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAxios } from '@vueuse/integrations/useAxios'
import { apiUrl } from '~/config/env'
import axios, { AxiosError } from 'axios'
import { toast } from 'vue3-toastify'

const instance = axios.create({
  baseURL: apiUrl,
})

const axiosOptions = {
  immediate: false,
}
instance.interceptors.response.use(undefined, function (error: AxiosError<any>) {
  const message = error.response?.data.message || 'Houve um erro ao realizar a operação'

  toast(message, { type: 'error' })
})


export function useGet(url: string) {
  return useAxios(url, { method: 'get' }, instance, axiosOptions)
}

export function usePost(url: string, data: unknown) {
  return useAxios(url, { method: 'post', data }, instance, axiosOptions)
}
