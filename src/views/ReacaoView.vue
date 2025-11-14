<template>
  <div>
    <form @submit.prevent="cadastrar">
      <p>
        <label>Reação: </label>
        <input type="text" v-model="novaReacao.texto" />
      </p>
      <p>
        <label>Tipo: </label>
        <input type="text" v-model="novaReacao.tipo" />
      </p>
      <p>
        <label>Data/Hora: </label>
        <input type="datetime-local" v-model="novaReacao.dataHora" />
      </p>
      <p>
        <button type="submit">Cadastrar</button>
      </p>
    </form>

    <form @submit.prevent="pesquisar">
      <p>
        <label>Reação: </label>
        <input type="text" v-model="pesquisa.texto" />
      </p>
      <p>
        <button type="submit">Pesquisar</button>
      </p>
    </form>

    <p v-if="erro">{{ erro }}</p>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Reação</th>
          <th>Tipo</th>
          <th>Data/Hora</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="reacao in reacao" :key="reacao.id">
          <td>{{ reacao.id }}</td>
          <td>{{ reacao.texto }}</td>
          <td>{{ reacao.tipo }}</td>
          <td>{{ reacao.dataHora }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import axios from "axios"

interface reacao {
  id?: number
  texto: string
  tipo: string
  dataHora: string
}

const novaReacao = ref<reacao>({ texto: '', tipo: '', dataHora: "",  })
const pesquisa = ref<reacao>({ texto: '', tipo: '', dataHora: "",  })

const reacao = ref<reacao[]>()

const erro = ref<string>()

async function pesquisar() {
  reacao.value = (
    await axios.get('reacao/pesquisar', {
      params: {
        texto: pesquisa.value.texto,
        tipo: pesquisa.value.tipo,
      },
    })
  ).data
}

async function cadastrar() {
  try {
    await axios.post('reacao', novaReacao.value)
    atualizar()
    novaReacao.value.texto = ''
    novaReacao.value.tipo = ''
    novaReacao.value.dataHora = ''
    erro.value = undefined
  } catch (e) {
    erro.value = (e as Error).message
  }
}

async function atualizar() {
  reacao.value = (await axios.get('reacao')).data
}

async function buscarReacoes() {
  reacao.value = (await axios.get('reacao')).data
}

onMounted(() => {
  atualizar()
  buscarReacoes()
})
</script>
