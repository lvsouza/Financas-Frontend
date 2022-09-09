import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomePageView from '../views/HomePageView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomePageView,
    meta: { title: 'Página inicial' }
  },
  {
    name: 'tipos-de-investimentos',
    path: '/tipos-de-investimentos',
    component: () => import('../views/tipos-de-investimento/ListagemDeTiposDeInvestimentos.vue'),
    meta: { title: 'Tipos de investimentos' }
  },
  {
    name: 'tipos-de-investimentos',
    path: '/tipos-de-investimentos/:id',
    component: () => import('../views/tipos-de-investimento/DetalheDeTiposDeInvestimentos.vue'),
    meta: { title: 'Tipos de investimentos' }
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

router.beforeEach((to, _, next) => {
  document.title = to?.meta?.title ? `${to.meta.title} - Finanças` : 'Finanças'
  next()
})
