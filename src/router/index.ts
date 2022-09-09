import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePageView
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})
