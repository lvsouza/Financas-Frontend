<template>
  <v-snackbar :value="true" :timeout="5000" :color="type" :right="true" :top="true" :style="{ top: top+'px',  }">
    {{ text }}
  </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    id: String,
    top: Number,
    text: String,
    type: String
  }
})
</script>
