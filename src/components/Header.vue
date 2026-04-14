<template>
  <header class="bg-white border-b border-gray-200 py-2 mb-4 sticky top-0 z-50">
    <div
      class="container mx-auto max-w-5xl px-4 flex justify-between items-center"
    >
      <router-link to="/" class="text-2xl font-bold text-gray-800"
        >V2EX Clone</router-link
      >
      <nav class="space-x-4 text-sm text-gray-600">
        <template v-if="!isLoggedIn">
          <router-link to="/login">登录</router-link>
          <router-link
            to="/register"
            class="bg-blue-500 text-white px-3 py-1 rounded"
            >注册</router-link
          >
        </template>
        <template v-else>
          <span>欢迎, {{ username }}</span>
          <button @click="logout" class="hover:text-red-500">注销</button>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// 假设你使用 localStorage 简单管理状态
const isLoggedIn = !!localStorage.getItem("token");
const username = localStorage.getItem("username");
const logout = () => {
  localStorage.clear();
  window.location.reload();
};
</script>