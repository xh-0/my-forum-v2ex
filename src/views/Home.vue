<template>
  <div class="max-w-5xl mx-auto px-4">
    <div
      class="bg-white shadow-sm rounded-t-lg overflow-hidden border border-gray-200"
    >
      <div
        v-for="post in posts"
        :key="post.id"
        class="p-3 border-b border-gray-100 hover:bg-gray-50 flex items-center transition"
      >
        <div class="flex-grow">
          <router-link
            :to="`/post/${post.id}`"
            class="text-gray-800 text-lg hover:underline"
          >
            {{ post.title }}
          </router-link>
          <div class="text-xs text-gray-400 mt-1">
            <span class="bg-gray-100 px-1 rounded">{{ post.authorId }}</span>
            <span class="ml-2">{{ post.createdAt }}</span>
          </div>
        </div>
        <div
          class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold"
        >
          {{ post.commentCount || 0 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { api } from "../api";
import type { Post } from "../types";

const posts = ref<Post[]>([]);

onMounted(async () => {
  posts.value = await api.getPosts();
});
</script>