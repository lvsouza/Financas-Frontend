<template>
  <div>
    Teste {{teste}}

    <button @click="teste++">Add</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    teste: 0
  })
})
</script>
