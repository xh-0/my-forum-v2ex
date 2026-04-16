import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useUserStore } from '@/store/user';
import { MessagePlugin } from 'tdesign-vue-next';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: () => import('../views/Home.vue') },
      { path: '/post/:id', name: 'Topic', component: () => import('../views/PostDetail.vue') },
      {
        path: 'Register',
        component: () => import('@/views/Register.vue'),
        meta: { requiresAuth: false } // 标记不需要登录
      },
      {
        path: '/login',
        component: () => import('@/views/Login.vue'),
        meta: { requiresAuth: false } // 标记不需要登录
      },
      {
        path: '/new',
        name: 'CreatePost',
        component: () => import('@/views/CreatePost.vue'),
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 如果页面需要登录且用户未登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    MessagePlugin.warning('请先登录');
    next('/login');
  } else {
    next();
  }
});

export default router;