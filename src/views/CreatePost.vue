<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createPost } from "@/api/forum";

const router = useRouter();
const title = ref("");
const content = ref("");
const loading = ref(false);

const handleSubmit = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert("请填写完整信息");
    return;
  }

  loading.value = true;
  try {
    await createPost({
      title: title.value,
      content: content.value,
    });
    alert("发布成功！");
    router.push("/"); // 发布成功返回首页
  } catch (err: any) {
    alert(err.response?.data?.error || "发布失败，请登录后重试");
    if (err.response?.status === 401) {
      router.push("/login");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container mx-auto max-w-4xl p-4">
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-4 py-2 border-b text-sm text-gray-600">
        <router-link to="/" class="hover:underline">V2EX Clone</router-link>
        <span class="mx-2">›</span> 发布新主题
      </div>

      <div class="p-4 space-y-4">
        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700"
            >主题标题</label
          >
          <input
            v-model="title"
            type="text"
            placeholder="请在此输入标题"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gray-400 outline-none"
          />
        </div>

        <div>
          <label class="block text-sm font-bold mb-2 text-gray-700"
            >正文内容</label
          >
          <textarea
            v-model="content"
            rows="10"
            placeholder="请在此输入正文"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:ring-1 focus:ring-gray-400 outline-none font-mono"
          ></textarea>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-xs text-gray-400">请保持友善，遵守社区规范。</span>
          <button
            @click="handleSubmit"
            :disabled="loading"
            class="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 disabled:bg-gray-400"
          >
            {{ loading ? "发布中..." : "立即发布" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>