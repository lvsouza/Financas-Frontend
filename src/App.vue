<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <MenuBarComponent />
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>
        {{ $route.meta?.title || '' }}
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container class="spacing-playground pa-6">
        <router-view />
      </v-container>
    </v-main>

    <FeedbackComponent />
    <ConfirmationComponent />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuBarComponent from './shared/components/menu-bar/MenuBarComponent.vue'
import FeedbackComponent from './shared/components/feedback/FeedbackComponent.vue'
import ConfirmationComponent from './shared/components/confirmation/ConfirmationComponent.vue'

export default Vue.extend({
  data: () => ({
    drawer: false
  }),
  components: {
    MenuBarComponent,
    FeedbackComponent,
    ConfirmationComponent
  }
})
</script>
