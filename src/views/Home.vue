<template>
  <div class="flex flex-col">
    <div
      class="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center justify-between"
    >
      <div class="flex gap-4 text-sm font-medium">
        <span class="text-gray-900 cursor-pointer border-b-2 border-gray-800"
          >全部话题</span
        >
        <span class="text-gray-400 hover:text-gray-600 cursor-pointer"
          >最热</span
        >
        <span class="text-gray-400 hover:text-gray-600 cursor-pointer"
          >技术</span
        >
      </div>
      <t-button variant="text" size="small" @click="fetchPosts">
        <template #icon><t-icon name="refresh" /></template>
      </t-button>
    </div>

    <div v-if="loading" class="p-4 space-y-6">
      <t-skeleton
        :row-col="[{ width: '60%' }, { width: '40%' }]"
        t-for="i in 5"
      />
    </div>

    <div v-else class="divide-y divide-gray-50">
      <div
        v-for="item in posts"
        :key="item.id"
        class="p-4 hover:bg-gray-50/80 transition-colors flex items-start gap-3"
      >
        <t-avatar
          shape="round"
          size="small"
          class="mt-1 flex-shrink-0 bg-blue-50 text-blue-500 font-bold"
        >
          {{ item.authorId?.[0].toUpperCase() }}
        </t-avatar>

        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-4">
            <router-link
              :to="`/post/${item.id}`"
              class="text-[#333] hover:text-blue-600 text-base font-medium leading-snug line-clamp-1"
            >
              {{ item.title }}
            </router-link>

            <div
              v-if="item.commentCount"
              class="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs font-bold"
            >
              {{ item.commentCount }}
            </div>
          </div>

          <div
            class="text-[12px] text-gray-400 mt-1.5 flex items-center flex-wrap gap-2"
          >
            <t-tag
              variant="light"
              size="small"
              class="!text-[10px] !px-1.5 !h-4"
              >问与答</t-tag
            >
            <span
              class="font-bold text-gray-600 hover:underline cursor-pointer"
              >{{ item.authorId }}</span
            >
            <span class="text-gray-300">•</span>
            <span>{{ item.createdAt }}</span>
            <template v-if="item.lastReplyUser">
              <span class="text-gray-300">•</span>
              <span
                >最后回复来自
                <strong class="text-gray-500">{{
                  item.lastReplyUser
                }}</strong></span
              >
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="p-3 text-center border-t border-gray-50">
      <t-button
        variant="text"
        theme="default"
        size="small"
        class="text-gray-400"
      >
        查看更多话题...
      </t-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getPostList } from "@/api/forum";
// 引入 TDesign 图标
import { Icon as TIcon } from "tdesign-icons-vue-next";

const posts = ref<any>([]);
const loading = ref(true);

const fetchPosts = async () => {
  loading.value = true;
  try {
    const data = await getPostList();
    posts.value = data;
  } catch (err) {
    console.error("获取列表失败", err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPosts);
</script>

<style scoped>
/* 限制标题只显示一行，保持列表整洁 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>