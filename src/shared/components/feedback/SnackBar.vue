<template>
  <v-snackbar :value="true" :timeout="5000" :color="type" :right="true" :top="true">
    {{ text }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: String,
    text: String,
    type: String
  }
})
</script>
