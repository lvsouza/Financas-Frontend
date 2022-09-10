/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict'
import { feedback as feedbackEvent } from '@/shared/events'
import Vue from 'vue'

export const _feedback = feedbackEvent

const feedback = {
  install: (vue: any) => {
    vue.feedback = _feedback

    Object.defineProperties(vue.prototype, {
      $feedback: {
        get() {
          return _feedback
        }
      }
    })
  }
}

Vue.use(feedback)

export { feedback }
