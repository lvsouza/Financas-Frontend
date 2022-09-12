<template>
  <div>
    <SnackBar v-for="(feedback, index) in feedbacks" :key="feedback.id" :id="feedback.id" :text="feedback.message"
      :type="feedback.type" :top="60 * (index)" />
  </div>
</template>

<script lang="ts">
import { addFeedbackEventListener, IFeedback } from '@/shared/events'
import SnackBar from './SnackBar.vue'
import { v4 as uuid } from 'uuid'
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    feedbacks: [] as (IFeedback & {
      id: string
    })[],
    removeListener: null as (null | (() => void))
  }),
  watch: {
    feedbacks() {
      console.log(this.feedbacks)
    }
  },
  methods: {
    handleAdd(feedback: IFeedback) {
      const id = uuid()

      setTimeout(() => feedback.onClose?.(), 5000)
      setTimeout(() => this.handleRemove(id), 5100)

      this.feedbacks.push({ ...feedback, id })
    },
    handleRemove(id: string) {
      const index = this.feedbacks.findIndex(feedback => feedback.id === id)
      if (index === undefined) return

      this.feedbacks.splice(index, 1)
    }
  },
  mounted() {
    this.removeListener = addFeedbackEventListener(this.handleAdd)
  },
  destroyed() {
    this.removeListener?.()
  },
  components: { SnackBar }
})
</script>
