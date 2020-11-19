import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/blackfriday',
    name: 'blackfriday',
    component: () => import(/* webpackChunkName: "blackfriday" */ '@/views/BlackFriday.vue'),
    props: true
  },
  {
    path: '/404',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue'),
    props: true
  },
  {
    path: '/:route',
    name: 'page',
    component: () => import(/* webpackChunkName: "page" */ '@/views/Page.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
