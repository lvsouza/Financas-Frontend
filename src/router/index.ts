import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePageView
  },
  {
    name: 'tipos-de-investimentos',
    path: '/tipos-de-investimentos',
    component: () => import('../views/tipos-de-investimento/ListagemDeTiposDeInvestimentos.vue')
  },
  {
    name: 'tipos-de-investimentos',
    path: '/tipos-de-investimentos/:id',
    component: () => import('../views/tipos-de-investimento/DetalheDeTiposDeInvestimentos.vue')
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})
