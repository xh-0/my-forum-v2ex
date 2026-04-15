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
        <span class="text-xs text-gray-300">{{ Number(index) + 1 }}</span>
        <div class="flex-grow">
          <div class="text-xs font-bold text-gray-600 mb-1">
            {{ comment.authorId }}
          </div>
          <div class="text-gray-800 text-sm">{{ comment.content }}</div>
        </div>
      </div>

      <div class="p-4 bg-gray-50">
        <div v-if="hasToken">
          <textarea
            v-model="commentText"
            class="w-full p-2 border rounded-md"
            rows="3"
            placeholder="请尽量让回复对别人有帮助"
          ></textarea>
          <button
            @click="handleComment"
            :disabled="loading"
            class="mt-2 bg-gray-800 text-white px-4 py-1.5 rounded text-sm disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading">正在发送...</span>
            <span v-else>回复</span>
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
// 1. 导入你封装的接口函数
import { getPostDetail, addComment } from "@/api/forum";

const route = useRoute();
const post = ref<any>(null);
const commentText = ref("");
const loading = ref(false);
const hasToken = !!localStorage.getItem("token");

const loadPost = async () => {
  try {
    // 2. 使用 getPostDetail 替换 api.getPostDetail
    const res = await getPostDetail(route.params.id as string);
    post.value = res;
  } catch (err) {
    console.error("加载帖子失败", err);
  }
};

const handleComment = async () => {
  if (!commentText.value.trim()) return;

  loading.value = true;
  try {
    // 这里的 route.params.id 就是路径里的帖子 ID
    await addComment(route.params.id as string, commentText.value);

    // 成功后的逻辑
    commentText.value = "";
    alert("评论发表成功");

    // 重新加载帖子详情或评论列表，实现回显
    // await loadPost();
  } catch (err: any) {
    if (err.response?.status === 401) {
      alert("请先登录");
    } else {
      alert(err.response?.data?.error || "评论失败");
    }
  } finally {
    loading.value = false;
  }
};

onMounted(loadPost);
</script>