<template>
  <div class="space-y-4 pb-12" v-if="post">
    <div
      class="bg-white border border-gray-200 rounded-sm px-4 py-3 flex items-center text-sm shadow-sm"
    >
      <router-link to="/" class="text-blue-500 hover:underline"
        >DUSK2</router-link
      >
      <span class="mx-2 text-gray-300">›</span>
      <span class="text-gray-500 truncate">主题详情</span>
    </div>

    <t-card :bordered="false" class="rounded-sm! shadow-sm">
      <div
        class="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6"
      >
        <div class="flex-1">
          <h1 class="text-2xl font-bold text-gray-900 leading-tight mb-3">
            {{ post.title }}
          </h1>
          <div class="flex items-center gap-2 text-xs text-gray-400">
            <t-tag variant="light-outline" size="small" class="text-[10px]!"
              >问与答</t-tag
            >
            <span class="font-bold text-gray-700">{{ post.authorId }}</span>
            <span>•</span>
            <span>发布于 {{ post.createdAt }}</span>
          </div>
        </div>
        <t-avatar
          shape="round"
          size="large"
          class="hidden md:block bg-blue-50 text-blue-500 font-bold"
        >
          {{ post.authorId?.[0].toUpperCase() }}
        </t-avatar>
      </div>

      <div class="border-t border-gray-50 pt-6">
        <div
          class="text-gray-800 leading-relaxed text-[15px] whitespace-pre-wrap wrap-break-word"
        >
          {{ post.content }}
        </div>
      </div>
    </t-card>

    <t-card :bordered="false" class="rounded-sm! shadow-sm">
      <template #header>
        <div class="text-xs font-medium text-gray-400">
          {{ post.comments?.length || 0 }} 回复
        </div>
      </template>

      <div class="divide-y divide-gray-50">
        <t-comment
          v-for="(comment, index) in post.comments"
          :key="comment.id"
          :author="comment.authorId"
          :datetime="comment.createdAt"
          class="py-4 hover:bg-gray-50/50 transition-colors"
        >
          <template #avatar>
            <t-avatar size="small" class="bg-gray-100 text-gray-500 font-bold">
              {{ comment.authorId?.[0].toUpperCase() }}
            </t-avatar>
          </template>
          <template #content>
            <div class="text-gray-800 text-[14px] leading-normal mt-1">
              {{ comment.content }}
            </div>
          </template>
          <template #actions>
            <span class="text-[10px] text-gray-200 font-mono"
              >#{{ Number(index) + 1 }}</span
            >
          </template>
        </t-comment>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-100">
        <div v-if="userStore.isLoggedIn" class="flex flex-col gap-3">
          <div class="text-sm font-bold text-gray-600">添加一条新回复</div>
          <t-textarea
            v-model="commentText"
            placeholder="请尽量让回复对别人有帮助"
            :autosize="{ minRows: 4 }"
            class="bg-gray-50! border-gray-200!"
          />
          <div class="flex justify-end">
            <t-button
              :loading="loading"
              @click="handleComment"
              class="bg-[#333]! border-none! px-6"
            >
              发送回复
            </t-button>
          </div>
        </div>
        <div
          v-else
          class="text-center py-8 bg-gray-50 rounded-sm border border-dashed border-gray-200"
        >
          <p class="text-gray-400 text-sm">
            你需要登录后方可发表回复
            <router-link to="/login" class="text-blue-500 font-bold ml-1"
              >立即登录</router-link
            >
          </p>
        </div>
      </div>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPostDetail, addComment } from "@/api/forum";
import { MessagePlugin } from "tdesign-vue-next";

import { useUserStore } from "@/stores/user";

const route = useRoute();
const userStore = useUserStore();

const post = ref<any>(null);
const commentText = ref("");
const loading = ref(false);

const loadPost = async () => {
  try {
    post.value = await getPostDetail(route.params.id as string);
  } catch (err) {
    MessagePlugin.error("无法加载主题内容");
  }
};

const handleComment = async () => {
  if (!commentText.value.trim()) return;

  loading.value = true;
  try {
    await addComment(route.params.id as string, commentText.value);
    commentText.value = "";
    MessagePlugin.success("回复成功");
    await loadPost();
  } catch (err: any) {
    MessagePlugin.error(err.response?.data?.error || "评论失败");
  } finally {
    loading.value = false;
  }
};

onMounted(loadPost);
</script>

<style scoped>
/* 调整 TDesign Comment 的内部间距，使其更紧凑 */
:deep(.t-comment__author) {
  font-weight: 700;
  color: #555;
  font-size: 13px;
}
:deep(.t-comment__datetime) {
  font-size: 11px;
  color: #ccc;
}
</style>