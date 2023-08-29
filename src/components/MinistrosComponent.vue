<template>
  <v-card :loading="isLoading">
    <v-card-title>Ministros</v-card-title>
    <v-btn density="default" icon="mdi-plus"></v-btn>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Nome</th>
          <th class="text-left">Nome</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in ministers" :key="item.id">
          <td>{{ item.nome }}</td>
          <td>{{ item.partido }}</td>
          <td>{{ item.salario }}</td>
          <td>{{ item.dataEntrada }}</td>
          <td>{{ item.dataSaida }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-snackbar v-model="snackShow" :timeout="2000" color="red">
    {{ errorMsg }}
  </v-snackbar>
</template>

<script lang="ts">
import { Ministro } from '@/assets/models/all-models.ts'
import { env } from '../../environment.ts'
import { DefaultResponseDto } from '@/assets/models/all-models.ts'

export default {
  beforeMount() {
    this.getMinisters()
  },
  data: () => ({
    ministers: new Array<Ministro>(),
    isLoading: false,
    snackShow: false,
    errorMsg: ''
  }),
  methods: {
    async getMinisters() {
      this.isLoading = true
      try {
        await new Promise((r) => setTimeout(r, 500))

        const response = await fetch(env.uri + 'ministro/list')

        if (!response.ok) await Promise.reject(await response.json())

        const json: DefaultResponseDto<Ministro[]> = await response.json()
        this.ministers = json.data
      } catch (error) {
        this.errorMsg = error.message
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
