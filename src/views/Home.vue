<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPostList } from "@/api/forum";

const posts = ref<any>([]);
const loading = ref(true);

const fetchPosts = async () => {
  try {
    const data = await getPostList();
    posts.value = data;
  } catch (err) {
    console.error("获取列表失败", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="container mx-auto max-w-5xl p-4">
    <div v-if="loading" class="text-center py-10">加载中...</div>

    <div v-else class="bg-white shadow rounded-lg divide-y divide-gray-100">
      <div
        v-for="item in posts"
        :key="item.id"
        class="p-4 hover:bg-gray-50 flex items-center"
      >
        <div class="flex-1">
          <router-link :to="`/post/${item.id}`" class="text-gray-800 text-lg">
            {{ item.title }}
          </router-link>
          <div class="text-xs text-gray-400 mt-1">
            <span class="bg-gray-100 px-1 rounded">{{ item.author_id }}</span>
            <span class="ml-2">{{
              new Date(item.created_at).toLocaleString()
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>