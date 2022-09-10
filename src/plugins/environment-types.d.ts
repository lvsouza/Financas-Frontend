/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { _environment } from './environment'

declare module 'vue/types/vue' {
  interface Vue {
    $environment: typeof _environment
  }
}
