<template>
  <div class="main-container">
    <div>
      <div class="title">
        <h1>Gerencia Ministérios</h1>
      </div>
      <div>
        <v-form ref="form" @submit.prevent="submitForm()">
          <v-text-field
            v-model="loginForm.cpf"
            :rules="requiredRules"
            label="CPF"
            required
          ></v-text-field>
          <v-text-field
            v-model="loginForm.password"
            :rules="requiredRules"
            label="Senha"
            required
            type="password"
          ></v-text-field>
          <v-btn :loading="isLoading" type="submit" block size="large" variant="elevated">
            Login
          </v-btn>
        </v-form>
      </div>
    </div>
  </div>
  <v-snackbar :timeout="2000" color="red" v-model="showSnackbar">
    {{ errorText }}

    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="showSnackbar = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
  <v-snackbar :timeout="1000" color="green" v-model="showSuccessSnackbar">
    Sucesso!
    <template v-slot:actions>
      <v-btn color="white" variant="text" @click="showSuccessSnackbar = false"> Fechar </v-btn>
    </template>
  </v-snackbar>
</template>

<style scoped>
.main-container {
  width: 25%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
}

.title {
  text-align: center;
  margin-bottom: 2rem;
}
</style>

<script lang="ts">
import { AuthDto, AuthResponseDto, DefaultResponseDto } from '@/assets/models/all-models.ts'
import { env } from '../../environment.ts'

export default {
  data: () => ({
    loginForm: new AuthDto(),
    isLoading: false,
    showSnackbar: false,
    showSuccessSnackbar: false,
    errorText: '',
    requiredRules: [
      (value: string) => {
        if (value) return true

        return 'Este campo é obrigatório.'
      }
    ]
  }),
  methods: {
    async submitForm() {
      const { valid } = await (this.$refs.form as any).validate()

      if (valid) await this.login(this.loginForm)
    },
    async login(value: AuthDto) {
      try {
        this.isLoading = true

        await new Promise((r) => setTimeout(r, 500))

        const response = await fetch(env.uri + 'auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(value)
        })

        if (!response.ok) await Promise.reject(await response.json())

        const jsonResponse: DefaultResponseDto<AuthResponseDto> = await response.json()

        this.showSuccessSnackbar = true
        this.setUserInfo(jsonResponse.data)
      } catch (error: any) {
        console.log(error.message)
        this.errorText = error.message
        this.showSnackbar = true
      } finally {
        this.isLoading = false
      }
    },
    setUserInfo(info: AuthResponseDto) {
      localStorage.setItem('login', JSON.stringify(info))
      this.$router.push('/main')
    }
  }
}
</script>
