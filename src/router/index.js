import Vue from 'vue'
import VueRouter from 'vue-router'
import BreathingExercise from '../views/BreathingExercise/Index.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: BreathingExercise
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from, next) => {
  if (to.path === '/about') {
    store.dispatch('setTitle', 'About')
    next()
  } else next()
})

export default router
