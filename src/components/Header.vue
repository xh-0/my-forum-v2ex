<template>
  <header
    class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
  >
    <div class="max-w-5xl mx-auto px-4 h-14 flex justify-between items-center">
      <router-link to="/" class="flex items-center gap-2 group">
        <div
          class="bg-gray-900 text-white w-8 h-8 flex items-center justify-center rounded-sm font-black text-xl group-hover:bg-blue-600 transition-colors"
        >
          V
        </div>
        <span class="text-lg font-bold tracking-tighter text-gray-800"
          >V2EX CLONE</span
        >
      </router-link>

      <nav class="flex items-center gap-2">
        <template v-if="!isLoggedIn">
          <t-button variant="text" size="small" @click="$router.push('/login')"
            >登录</t-button
          >
          <t-button
            theme="primary"
            size="small"
            @click="$router.push('/register')"
            class="!rounded-sm"
          >
            注册
          </t-button>
        </template>

        <template v-else>
          <t-dropdown :options="userOptions" @click="handleMenuClick">
            <t-button variant="text" class="px-2!">
              <div class="flex items-center gap-2">
                <t-avatar
                  size="small"
                  shape="round"
                  class="bg-blue-100 text-blue-600"
                >
                  {{ username?.[0].toUpperCase() }}
                </t-avatar>
                <span
                  class="text-sm font-medium text-gray-700 hidden sm:inline"
                  >{{ username }}</span
                >
                <t-icon name="chevron-down" size="14px" class="text-gray-400" />
              </div>
            </t-button>
          </t-dropdown>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import { useRouter } from "vue-router";
// 记得从 tdesign 引入图标
import { Icon as TIcon } from "tdesign-icons-vue-next";

const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem("token"));
const username = ref(localStorage.getItem("username"));

// 下拉菜单配置
const userOptions = [
  {
    content: "个人中心",
    value: "profile",
    prefixIcon: () => h(TIcon, { name: "user" }),
  },
  {
    content: "我的帖子",
    value: "posts",
    prefixIcon: () => h(TIcon, { name: "chat" }),
  },
  {
    content: "注销登录",
    value: "logout",
    theme: "error",
    prefixIcon: () => h(TIcon, { name: "logout" }),
  },
];

const handleMenuClick = (data: any) => {
  if (data.value === "logout") {
    logout();
  } else if (data.value === "profile") {
    router.push("/profile");
  }
};

const logout = () => {
  localStorage.clear();
  window.location.href = "/"; // 彻底刷新状态
};
</script>

<style scoped>
/* 深度作用选择器，确保 TDesign 按钮在 Header 中更紧凑 */
:deep(.t-button--size-s) {
  padding: 0 12px;
}
</style>
