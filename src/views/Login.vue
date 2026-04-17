<template>
  <div class="min-h-[80vh] flex items-center justify-center p-4">
    <div
      class="w-full max-w-[400px] bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden"
    >
      <div
        class="bg-gray-50 px-6 py-3 border-b border-gray-100 flex items-center justify-between"
      >
        <span class="text-sm font-bold text-gray-700">登录 DUSK2</span>
        <router-link to="/" class="text-xs text-blue-500 hover:underline"
          >返回首页</router-link
        >
      </div>

      <div class="p-8 space-y-6">
        <div class="space-y-2">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider"
            >用户名</label
          >
          <t-input
            v-model="username"
            placeholder="请输入用户名"
            size="large"
            clearable
            class="!rounded-sm"
          >
            <template #prefix-icon>
              <t-icon name="user" class="text-gray-300" />
            </template>
          </t-input>
        </div>

        <div class="space-y-2">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-wider"
            >密码</label
          >
          <t-input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            size="large"
            clearable
            class="!rounded-sm"
          >
            <template #prefix-icon>
              <t-icon name="lock-on" class="text-gray-300" />
            </template>
          </t-input>
        </div>

        <t-button
          block
          size="large"
          :loading="loading"
          @click="handleLogin"
          class="!bg-[#333] !border-none !rounded-sm hover:!bg-black transition-all"
        >
          立即登录
        </t-button>

        <div class="flex items-center justify-between pt-2">
          <router-link
            to="/register"
            class="text-xs text-gray-400 hover:text-blue-500 transition-colors"
          >
            还没有账号？立即注册
          </router-link>
          <span class="text-xs text-gray-300 cursor-not-allowed">找回密码</span>
        </div>

        <t-alert
          v-if="errorMsg"
          theme="error"
          variant="light"
          class="!py-2 !px-3"
        >
          <template #message>
            <span class="text-xs">{{ errorMsg }}</span>
          </template>
        </t-alert>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/forum";
import { useUserStore } from "@/store/user";
import { MessagePlugin } from "tdesign-vue-next";
import { Icon as TIcon } from "tdesign-icons-vue-next";

const userStore = useUserStore();
const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  if (!username.value || !password.value) {
    MessagePlugin.warning("请填写完整的登录信息");
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    const res = (await login({
      username: username.value,
      password: password.value,
    })) as any;

    // 使用 Pinia 存储，由于开启了 persist，插件会自动处理 localStorage
    userStore.setLoginInfo(res.token, res.user.username);

    MessagePlugin.success("欢迎回来，" + res.user.username);

    // 跳转到首页
    router.push("/");
  } catch (err: any) {
    // 优先取后端返回的错误信息
    errorMsg.value =
      err.response?.data?.message ||
      err.response?.data?.error ||
      "登录失败，请检查网络或账号密码";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* 深度覆盖 TDesign 样式，确保符合极简审美 */
:deep(.t-input) {
  background-color: #fafafa;
  border-color: #eee;
}
:deep(.t-input--focused) {
  border-color: #333 !important;
  box-shadow: none !important;
}
</style>