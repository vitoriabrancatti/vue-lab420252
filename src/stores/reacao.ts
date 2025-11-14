import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const reacaoStore = defineStore(
  'reacao',
  () => {
    const reacao = ref<Array<unknown>>([])
    const erro = ref<string>()
    async function buscarreacao() {
      try {
        const response = await axios.get('reacao')
        reacao.value = response.data
        erro.value = ''
      }
      catch (ex) {
        erro.value = (ex as Error).message
      }
    }
    return { reacao, erro, buscarreacao }
  },
  {
    persist: true,
  },
)
