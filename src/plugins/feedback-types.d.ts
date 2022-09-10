/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { _feedback } from './feedback'

declare module 'vue/types/vue' {
  interface Vue {
    $feedback: typeof _feedback
  }
}
