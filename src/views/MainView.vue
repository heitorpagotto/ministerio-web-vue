<template>
  <div>
    <v-layout>
      <v-navigation-drawer expand-on-hover rail>
        <v-list>
          <v-list-item :title="userInfo.nome" :subtitle="userInfo.userType">
            <template v-slot:prepend>
              <v-avatar color="grey-lighten-2">
                <v-icon color="grey">mdi-account</v-icon>
              </v-avatar>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder"
            title="Ministros"
            value="ministers"
            @click="navigateTo('main/ministers')"
          ></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Ministérios"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Secretarias" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <div style="box-sizing: border-box; padding: 1rem; width: 100%; overflow: auto">
          <RouterView />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts">
import type { AuthResponseDto } from '@/assets/models/all-models.ts'

export default {
  data: () => ({
    userInfo: JSON.parse(localStorage.getItem('login')) as AuthResponseDto
  }),
  methods: {
    navigateTo(route: string) {
      this.$router.push(route)
    }
  }
}
</script>
