/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { _dataSources } from './dataSources'

declare module 'vue/types/vue' {
  interface Vue {
    $dataSources: typeof _dataSources
  }
}
