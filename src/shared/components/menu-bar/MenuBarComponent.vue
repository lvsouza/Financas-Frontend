<template>
  <v-list >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Finanças </v-list-item-title>
        <v-list-item-subtitle> Pessoais </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item v-for="item in items" :key="item.title" link :to="item.path">
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          {{ item.title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    items: [
      { title: 'Página inicial', icon: 'mdi-view-dashboard', path: '/' },
      { title: 'Tipos de investimentos', icon: 'mdi-shape', path: '/tipos-de-investimentos' }
    ]
  })
})
</script>
