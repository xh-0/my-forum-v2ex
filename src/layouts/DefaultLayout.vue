<template>
  <div class="min-h-screen">
    <Header />
    <main class="max-w-5xl mx-auto mt-6 flex gap-6 px-4">
      <div class="flex-1 bg-v2-surface rounded shadow-sm min-w-0">
        <router-view />
      </div>
      <div class="w-72 hidden md:block">
        <!-- 发帖 -->
        <div class="bg-v2-surface p-4 rounded shadow-sm mb-4">
          <router-link to="/new">
            <button
              class="w-full bg-v2-primary text-black py-2 px-4 rounded shadow-sm"
            >
              发帖
            </button>
          </router-link>
        </div>
        <div class="bg-v2-surface p-4 rounded shadow-sm">
          <h3 class="text-sm font-bold text-gray-500 border-b pb-2 mb-2">
            关于
          </h3>
          <p class="text-sm text-gray-600">
            这是一个基于 Vue 3 + Giscus 的静态 dusk2 克隆项目。
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
</script>