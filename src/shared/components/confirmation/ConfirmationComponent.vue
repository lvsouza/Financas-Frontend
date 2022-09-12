<template>
  <div>
    <v-dialog width="500" v-for="(confirmation) in confirmations" :key="confirmation.id" :value="confirmation.open"
      persistent>
      <v-card>
        <v-card-title class="text-h5">
          {{confirmation.title}}
        </v-card-title>

        <v-card-text>
          {{confirmation.message}}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="handleCancel(confirmation)">
            {{confirmation.cancelText || 'Cancelar'}}
          </v-btn>
          <v-btn color="primary" @click="handleConfirm(confirmation)">
            {{confirmation.confirmText || 'Confirmar'}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { addConfirmationEventListener, IConfirmation } from '@/shared/events'
import { v4 as uuid } from 'uuid'
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    confirmations: [] as (IConfirmation & { id: string, open: boolean })[],
    removeListener: null as (null | (() => void))
  }),
  methods: {
    handleAdd(confirmation: IConfirmation) {
      const id = uuid()
      this.confirmations.push({ ...confirmation, id, open: true })
    },
    handleRemove(id: string) {
      const index = this.confirmations.findIndex(confirmation => confirmation.id === id)
      if (index === undefined) return

      this.confirmations.splice(index, 1)
    },
    handleCancel(confirmation: IConfirmation & { id: string, open: boolean }) {
      confirmation.open = false
      confirmation.onCancel?.()
      this.handleRemove(confirmation.id)
    },
    handleConfirm(confirmation: IConfirmation & { id: string, open: boolean }) {
      confirmation.open = false
      confirmation.onConfirm?.()
      this.handleRemove(confirmation.id)
    }
  },
  mounted() {
    this.removeListener = addConfirmationEventListener(this.handleAdd)
  },
  destroyed() {
    this.removeListener?.()
  }
})
</script>
