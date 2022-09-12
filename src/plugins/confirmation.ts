/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict'
import { confirmation as confirmationEvent } from '@/shared/events'
import Vue from 'vue'

export const _confirmation = confirmationEvent

const confirmation = {
  install: (vue: any) => {
    vue.confirmation = _confirmation

    Object.defineProperties(vue.prototype, {
      $confirmation: {
        get() {
          return _confirmation
        }
      }
    })
  }
}

Vue.use(confirmation)

export { confirmation }
