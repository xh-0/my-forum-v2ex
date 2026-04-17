<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4">
    <div
      class="w-full max-w-[400px] bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
    >
      <div
        class="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center justify-between"
      >
        <span class="text-sm font-bold text-gray-700">加入 DUSK2 社区</span>
        <router-link to="/" class="text-xs text-blue-500 hover:underline"
          >返回首页</router-link
        >
      </div>

      <div class="p-8 space-y-5">
        <div class="space-y-2">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider"
            >用户名</label
          >
          <t-input
            v-model="username"
            placeholder="不少于 2 个字符"
            size="large"
            class="!rounded-sm"
          >
            <template #prefix-icon
              ><t-icon name="user" class="text-gray-300"
            /></template>
          </t-input>
        </div>

        <div class="space-y-2">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider"
            >设置密码</label
          >
          <t-input
            v-model="password"
            type="password"
            placeholder="建议使用复杂密码"
            size="large"
            class="!rounded-sm"
          >
            <template #prefix-icon
              ><t-icon name="lock-on" class="text-gray-300"
            /></template>
          </t-input>
        </div>

        <div class="space-y-2">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider"
            >确认密码</label
          >
          <t-input
            v-model="confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            size="large"
            class="!rounded-sm"
          >
            <template #prefix-icon
              ><t-icon name="check-circle" class="text-gray-300"
            /></template>
          </t-input>
        </div>

        <t-button
          block
          size="large"
          :loading="loading"
          @click="handleRegister"
          class="!bg-[#333] !border-none !rounded-sm hover:!bg-black transition-all mt-2"
        >
          创建账号
        </t-button>

        <div class="text-center pt-2">
          <span class="text-xs text-gray-400">已经有账号了？</span>
          <router-link
            to="/login"
            class="text-xs text-blue-500 font-bold hover:underline ml-1"
          >
            现在登录
          </router-link>
        </div>

        <t-alert
          v-if="errorMsg"
          theme="error"
          variant="light"
          class="!py-2 !px-3"
        >
          <template #message
            ><span class="text-xs">{{ errorMsg }}</span></template
          >
        </t-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/forum";
import { MessagePlugin } from "tdesign-vue-next";
import { Icon as TIcon } from "tdesign-icons-vue-next";

const router = useRouter();
const username = ref("");
const password = ref("");
const confirmPassword = ref(""); // 新增确认密码状态
const loading = ref(false);
const errorMsg = ref("");

const handleRegister = async () => {
  // 1. 前端基础校验
  if (!username.value || !password.value) {
    MessagePlugin.warning("请完整填写用户名和密码");
    return;
  }

  if (password.value !== confirmPassword.value) {
    errorMsg.value = "两次输入的密码不一致";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    await register({
      username: username.value,
      password: password.value,
    });

    MessagePlugin.success("注册成功！请登录");
    // 延迟一秒跳转，让用户看清成功提示
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  } catch (err: any) {
    errorMsg.value =
      err.response?.data?.error || "注册失败，该用户名可能已被占用";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
:deep(.t-input) {
  background-color: #fafafa;
  border-color: #eee;
}
:deep(.t-input--focused) {
  border-color: #333 !important;
  box-shadow: none !important;
}
</style>