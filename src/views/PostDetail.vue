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
// 1. 导入你封装的接口函数
import { getPostDetail, addComment } from "@/api/forum";

const route = useRoute();
const post = ref<any>(null);
const commentText = ref("");
// 注意：Token 现在由 axios 拦截器自动处理，这里不需要手动获取并传递了
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
  if (!commentText.value) return;

  try {
    // 3. 适配新的 addComment 参数结构 { postId, content }
    await addComment({
      postId: post.value.id,
      content: commentText.value,
    });

    commentText.value = "";
    await loadPost(); // 刷新详情和评论列表
  } catch (err) {
    alert("评论发表失败，请重试");
  }
};

onMounted(loadPost);
</script>