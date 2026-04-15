<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/api/forum";

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

const handleRegister = async () => {
  if (!username.value || !password.value) {
    errorMsg.value = "请完整填写信息";
    return;
  }

  loading.value = true;
  errorMsg.value = "";

  try {
    await register({
      username: username.value,
      password: password.value,
    });

    alert("注册成功！正在跳转至登录页");
    router.push("/login");
  } catch (err: any) {
    // 捕获后端返回的错误信息
    errorMsg.value = err.response?.data?.error || "注册失败，请稍后再试";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-sm w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        创建新账号
      </h2>

      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1"
            >用户名</label
          >
          <input
            v-model="username"
            type="text"
            placeholder="不少于 2 个字符"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1"
            >密码</label
          >
          <input
            v-model="password"
            type="password"
            placeholder="请设置您的密码"
            class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <button
          @click="handleRegister"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {{ loading ? "处理中..." : "注册" }}
        </button>

        <p v-if="errorMsg" class="text-red-500 text-sm text-center">
          {{ errorMsg }}
        </p>

        <div class="text-center text-sm text-gray-500 pt-2">
          已有账号？<router-link
            to="/login"
            class="text-blue-600 hover:underline"
            >立即登录</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>