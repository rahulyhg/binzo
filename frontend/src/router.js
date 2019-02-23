import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'home' },
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue')
        },
      ]
    },
  ]
})