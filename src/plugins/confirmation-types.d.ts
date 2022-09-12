/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { _confirmation } from './confirmation'

declare module 'vue/types/vue' {
  interface Vue {
    $confirmation: typeof _confirmation
  }
}
