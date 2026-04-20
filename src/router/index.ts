import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import { useUserStore } from "@/store/user";
import { MessagePlugin } from "tdesign-vue-next";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "/post/:id",
        name: "Topic",
        component: () => import("../views/PostDetail.vue"),
        meta: { requiresAuth: false },
      },
      {
        path: "Register",
        component: () => import("@/views/Register.vue"),
        meta: { requiresAuth: false }, // 标记不需要登录
      },
      {
        path: "/login",
        component: () => import("@/views/Login.vue"),
        meta: { requiresAuth: false }, // 标记不需要登录
      },
      {
        path: "/new",
        name: "CreatePost",
        component: () => import("@/views/CreatePost.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/profile",
        component: () => import("@/views/Profile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/tagAdmin",
        component: () => import("@/views/TagAdmin.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();

//   // 如果页面需要登录且用户未登录
//   if (to.meta.requiresAuth && !userStore.isLoggedIn) {
//     MessagePlugin.warning('请先登录');
//     next('/login');
//   } else {
//     next();
//   }
// });

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;

  // 1. 如果页面不需要登录，直接通行
  if (to.meta.requiresAuth === false) {
    return next();
  }

  // 2. 如果页面需要登录，但没有 Token，强制跳转登录页
  if (!token) {
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }

  // 3. 有 Token，但 Pinia 里没有用户信息 (说明刚刷新页面或重开了浏览器)
  if (!userStore.userInfo) {
    try {
      // 在这里调用后端接口校验 Token 是否有效，并获取用户信息
      await userStore.fetchUserInfo();
      return next(); // 获取成功，通行
    } catch (error) {
      // 校验失败（如 Token 过期），清空 Token，跳回登录页
      userStore.logout();
      return next({ path: "/login" });
    }
  }

  // 4. 通行
  next();
});

export default router;
