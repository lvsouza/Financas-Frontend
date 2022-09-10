/* eslint-disable @typescript-eslint/no-explicit-any */
'use strict'
import Vue from 'vue'

import { TiposDeInvestimentosDataSource } from '@/shared/services/data-sources/tipos-de-investimentos/TiposDeInvestimentosDataSource'

export const _dataSources = {
  tiposDeInvestimentos: TiposDeInvestimentosDataSource
}

const dataSources = {
  install: (vue: any) => {
    vue.dataSources = _dataSources
    // (window as any).dataSources = _services

    Object.defineProperties(vue.prototype, {
      $dataSources: {
        get() {
          return _dataSources
        }
      }
    })
  }
}

Vue.use(dataSources)

export { dataSources }
