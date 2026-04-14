<template>
  <div class="max-w-5xl mx-auto px-4 pb-10" v-if="post">
    <div class="bg-white shadow-sm p-5 rounded-lg border border-gray-200 mb-4">
      <h1 class="text-2xl font-semibold mb-4">{{ post.title }}</h1>
      <p class="text-gray-700 whitespace-pre-wrap leading-relaxed">
        {{ post.content }}
      </p>
    </div>

    <div class="bg-white shadow-sm rounded-lg border border-gray-200">
      <div class="p-3 border-b text-sm text-gray-500 bg-gray-50">
        {{ post.comments?.length || 0 }} 回复
      </div>
      <div
        v-for="(comment, index) in post.comments"
        :key="comment.id"
        class="p-4 border-b border-gray-100 flex space-x-3"
      >
        <span class="text-xs text-gray-300">{{ index + 1 }}</span>
        <div class="flex-grow">
          <div class="text-xs font-bold text-gray-600 mb-1">
            {{ comment.authorId }}
          </div>
          <div class="text-gray-800 text-sm">{{ comment.content }}</div>
        </div>
      </div>

      <div class="p-4 bg-gray-50">
        <div v-if="token">
          <textarea
            v-model="commentText"
            class="w-full p-2 border rounded-md"
            rows="3"
            placeholder="请尽量让回复对别人有帮助"
          ></textarea>
          <button
            @click="handleComment"
            class="mt-2 bg-gray-800 text-white px-4 py-1.5 rounded text-sm"
          >
            回复
          </button>
        </div>
        <div
          v-else
          class="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200"
        >
          你要先登录才能发表回复。
          <router-link to="/login" class="text-blue-500">去登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { api } from "../api";

const route = useRoute();
const post = ref<any>(null);
const commentText = ref("");
const token = localStorage.getItem("token");

const loadPost = async () => {
  post.value = await api.getPostDetail(route.params.id as string);
};

const handleComment = async () => {
  if (!commentText.value) return;
  await api.addComment(post.value.id, commentText.value, token!);
  commentText.value = "";
  await loadPost(); // 刷新
};

onMounted(loadPost);
</script>