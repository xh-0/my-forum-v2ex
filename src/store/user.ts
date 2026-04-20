import { apiMe } from '@/api/forum';
import { defineStore } from 'pinia';

// 定义 State 的类型
interface UserState {
  token: string | null;
  username: string | null;
  userInfo: any;
}

export const useUserStore = defineStore('user', {
  // 1. 状态：存放原始数据
  state: (): UserState => ({
    token: null,
    username: null,
    userInfo: null,
  }),

  // 2. 修饰：基于 state 的计算属性
  getters: {
    isLoggedIn: (state) => !!state.token,
    // 可以方便地获取用户首字母头像
    avatarLetter: (state) => state.username ? state.username[0].toUpperCase() : '?',
  },

  // 3. 动作：修改 state 的方法（支持同步和异步）
  actions: {
    async fetchUserInfo() {
      // 调用后端接口
      const data = await apiMe();
      this.userInfo = data;
    },

    // 登录成功存入数据
    setLoginInfo(token: string, username: string) {
      this.token = token;
      this.username = username;
    },

    // 退出登录清空数据
    logout() {
      this.$reset(); // 重置所有 state 到初始值
      localStorage.removeItem('token'); // 清除 localStorage 中的 token
    },
  },

  // 4. 持久化配置：自动与 localStorage 同步 只存储 token
  persist: {
    key: 'token',
    storage: localStorage,
    serializer: {
      deserialize: (value: string) => {
        const parsed = JSON.parse(value);
        return { token: parsed };
      },
      serialize: (value: any) => {
        return value.token || '';
      },
    },
  },
});