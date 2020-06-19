import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/conservatory',
    name: 'page-1',
    component: () => import(/* webpackChunkName: "page-1" */ '@/views/Page-1.vue')
  },
  {
    path: '/qv1',
    name: 'page-2',
    component: () => import(/* webpackChunkName: "page-2" */ '@/views/Page-2.vue')
  },
  {
    path: '/aurora',
    name: 'page-3',
    component: () => import(/* webpackChunkName: "page-3" */ '@/views/Page-3.vue')
  },
  {
    path: '/4',
    name: 'page-4',
    component: () => import(/* webpackChunkName: "page-4" */ '@/views/Page-4.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
