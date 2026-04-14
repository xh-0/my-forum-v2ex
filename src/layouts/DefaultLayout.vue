<template>
  <div class="min-h-screen">
    <Header />
    <main class="max-w-5xl mx-auto mt-6 flex gap-6 px-4">
      <div class="flex-1 bg-v2-surface rounded shadow-sm min-w-0">
        <router-view />
      </div>
      <aside class="w-72 hidden md:block">
        <div class="bg-v2-surface p-4 rounded shadow-sm">
          <h3 class="text-sm font-bold text-gray-500 border-b pb-2 mb-2">
            关于
          </h3>
          <p class="text-sm text-gray-600">
            这是一个基于 Vue 3 + Giscus 的静态 V2EX 克隆项目。
          </p>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
</script>