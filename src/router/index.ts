import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: () => import('../views/Home.vue') },
      { path: '/post/:id', name: 'Topic', component: () => import('../views/PostDetail.vue') }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})