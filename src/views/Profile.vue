<template>
  <div class="space-y-4 pb-12">
    <t-card :bordered="false" class="!rounded-sm shadow-sm">
      <div class="flex flex-col md:flex-row items-center gap-6 py-4">
        <t-avatar
          size="100px"
          shape="round"
          class="bg-blue-600 text-white font-bold text-3xl shadow-lg"
        >
          {{ userStore.avatarLetter }}
        </t-avatar>

        <div class="flex-1 text-center md:text-left">
          <h1 class="text-2xl font-bold text-gray-900 mb-1">
            {{ userStore.username }}
          </h1>
          <p class="text-gray-400 text-sm mb-4">
            dusk2 第 {{ userId?.slice(0, 8) }} 号会员
          </p>

          <div class="flex flex-wrap justify-center md:justify-start gap-4">
            <div class="text-center">
              <div class="text-lg font-bold text-gray-800">
                {{ posts.length }}
              </div>
              <div class="text-xs text-gray-400 uppercase tracking-wider">
                发布的主题
              </div>
            </div>
            <div class="w-px h-8 bg-gray-100 self-center"></div>
            <div class="text-center">
              <div class="text-lg font-bold text-gray-800">128</div>
              <div class="text-xs text-gray-400 uppercase tracking-wider">
                收到的感谢
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-2">
          <t-button variant="outline" size="small">
            <template #icon><t-icon name="edit" /></template>
            修改资料
          </t-button>
        </div>
      </div>
    </t-card>

    <t-card :bordered="false" class="!rounded-sm shadow-sm !p-0">
      <t-tabs v-model="activeTab" class="profile-tabs">
        <t-tab-panel value="posts" label="发布的主题">
          <div class="divide-y divide-gray-50">
            <div v-if="loading" class="p-8 text-center"><t-loading /></div>
            <template v-else-if="posts.length > 0">
              <div
                v-for="post in posts"
                :key="post.id"
                class="p-4 hover:bg-gray-50 flex justify-between items-center"
              >
                <router-link
                  :to="`/post/${post.id}`"
                  class="text-gray-700 hover:text-blue-600 font-medium"
                >
                  {{ post.title }}
                </router-link>
                <span class="text-xs text-gray-400">{{ post.createdAt }}</span>
              </div>
            </template>
            <div v-else class="p-12 text-center text-gray-400">
              暂未发布任何主题
            </div>
          </div>
        </t-tab-panel>

        <t-tab-panel value="replies" label="最近的回复">
          <div class="p-12 text-center text-gray-400">
            回复记录功能开发中...
          </div>
        </t-tab-panel>

        <t-tab-panel value="settings" label="账户设置">
          <div class="p-6 max-w-md mx-auto">
            <t-form label-align="top">
              <t-form-item label="用户名">
                <t-input :value="userStore.username" disabled />
              </t-form-item>
              <t-form-item label="新密码">
                <t-input type="password" placeholder="留空则不修改" />
              </t-form-item>
              <t-button
                block
                theme="primary"
                class="!bg-[#333] !border-none mt-4"
                >保存设置</t-button
              >
            </t-form>
          </div>
        </t-tab-panel>
      </t-tabs>
    </t-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { getPostList } from "@/api/forum"; // 复用获取列表接口，后续可加过滤参数
import { Icon as TIcon } from "tdesign-icons-vue-next";

const userStore = useUserStore();
const activeTab = ref("posts");
const posts = ref<any[]>([]);
const loading = ref(true);
const userId = ref(localStorage.getItem("token")); // 临时占位

onMounted(async () => {
  try {
    // 实际项目中这里应该调用获取“指定用户”帖子的接口
    const allPosts = await getPostList();
    // 模拟过滤当前用户的帖子
    posts.value = allPosts.filter(
      (p: any) => p.authorId === userStore.username
    );
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
/* 去掉 TDesign Tabs 默认的边框和内边距，使其更融合卡片 */
:deep(.t-tabs__nav-container) {
  padding: 0 16px;
  background-color: #fafafa;
}
:deep(.t-tabs__content) {
  padding: 0;
}
</style>