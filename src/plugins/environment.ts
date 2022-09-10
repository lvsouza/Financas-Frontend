/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict'
import Vue from 'vue'

import { Environment } from '@/shared/environment'

export const _environment = Environment

const environment = {
  install: (vue: any) => {
    vue.environment = _environment

    Object.defineProperties(vue.prototype, {
      $environment: {
        get() {
          return _environment
        }
      }
    })
  }
}

Vue.use(environment)

export { environment }
