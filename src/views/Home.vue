<template>
  <div class="flex flex-col">
    <div class="bg-gray-50 px-4 border-b border-gray-100">
      <div class="flex items-center h-10 gap-6 overflow-x-auto no-scrollbar">
        <button
          v-for="tab in categories"
          :key="tab.value"
          @click="handleTabChange(tab.value)"
          :class="[
            'text-sm whitespace-nowrap transition-colors relative h-full flex items-center',
            currentTag === tab.value
              ? 'text-blue-600 font-bold'
              : 'text-gray-500 hover:text-gray-800',
          ]"
        >
          {{ tab.label }}
          <div
            v-if="currentTag === tab.value"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
          ></div>
        </button>
      </div>
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
              variant="light-outline"
              size="small"
              class="!text-[10px] !px-1.5 !h-4"
              >{{ item.tag || "全部" }}</t-tag
            >
            <span class="font-bold text-gray-600">{{ item.authorId }}</span>
            <span class="text-gray-300">•</span>
            <span>{{ item.createdAt }}</span>
          </div>
        </div>
      </div>

      <div
        v-if="posts.length === 0"
        class="p-20 text-center text-gray-400 text-sm"
      >
        该分类下暂无讨论话题
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getCategories, getPostList } from "@/api/forum";

const posts = ref<any[]>([]);
const loading = ref(true);
const currentTag = ref("all"); // 当前选中的标签

const categories = ref([{ label: "全部", value: "all" }]);

const fetchPosts = async () => {
  loading.value = true;
  try {
    // 如果是 'all'，则不传参数，获取全部
    const tagParam = currentTag.value === "all" ? undefined : currentTag.value;
    const data: any = await getPostList(tagParam);
    posts.value = data;
  } catch (err) {
    console.error("获取列表失败", err);
  } finally {
    loading.value = false;
  }
};

const handleTabChange = (val: string) => {
  currentTag.value = val;
  fetchPosts();
};

onMounted(async () => {
  const dynamicTags: any = await getCategories();
  // 将后端返回的 {key, value} 映射为前端需要的 {label, value}
  const mappedTags = dynamicTags.map((item: any) => ({
    label: item.value,
    value: item.key,
  }));
  categories.value = [{ label: "全部", value: "all" }, ...mappedTags];
  fetchPosts();
});
</script>

<style scoped>
/* 隐藏滚动条但保留滚动功能 */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>