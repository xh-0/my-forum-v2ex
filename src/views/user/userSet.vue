<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">个人资料设置</h2>

    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">昵称</label>
        <input
          v-model="form.nickname"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">邮箱</label>
        <input
          v-model="form.email"
          type="text"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">个人简介</label>
        <textarea
          v-model="form.bio"
          rows="4"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>

      <button
        @click="handleSave"
        :disabled="loading"
        class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? "保存中..." : "保存修改" }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { updateProfile } from "@/api/user"; // 引入刚才写的接口
import { useUserStore } from "@/stores/user";
import { getMyProfile } from "@/api/user";
import { MessagePlugin } from "tdesign-vue-next";

const userStore = useUserStore();
const loading = ref(false);

const userInfo = ref<any>({});

// 初始化表单数据
const form = ref({
  nickname: "",
  email: "",
  bio: "",
});

const getUserInfo = async () => {
  const res: any = await getMyProfile();
  if (res.user) {
    userInfo.value = res.user;
    form.value.nickname = res.user.nickname;
    form.value.email = res.user.email;
    form.value.bio = res.user.bio;
    userStore.setUserInfo(res.user);
  }
};

const handleSave = async () => {
  loading.value = true;
  try {
    await updateProfile(form.value);
    MessagePlugin.success("保存成功！");
    await getUserInfo();
  } catch (error) {
    MessagePlugin.warning("保存失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await getUserInfo();
});
</script>