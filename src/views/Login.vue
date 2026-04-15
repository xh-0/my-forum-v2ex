<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "@/api/forum";

const router = useRouter();
const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMsg = ref("");

const handleLogin = async () => {
  if (!username.value) return alert("请输入用户名");

  loading.value = true;
  errorMsg.value = "";

  try {
    // 1. 调用登录接口
    const res = (await login({
      username: username.value,
      password: password.value,
    })) as any;

    // 2. 存储 Token 和用户信息
    // 假设后端返回结构为 { token: '...', user: { username: '...' } }
    localStorage.setItem("token", res.token);
    localStorage.setItem("username", res.user.username);

    // 3. 跳转到首页
    router.push("/");
  } catch (err: any) {
    errorMsg.value = err.response?.data?.message || "登录失败，请检查网络";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">
        登录 V2EX Clone
      </h1>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">用户名</label>
          <input
            v-model="username"
            type="text"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">密码</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          @click="handleLogin"
          :disabled="loading"
          class="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition"
        >
          {{ loading ? "登录中..." : "登录" }}
        </button>

        <p v-if="errorMsg" class="text-red-500 text-sm mt-2">{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>