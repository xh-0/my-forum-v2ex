import { defineStore } from 'pinia';

// 定义 State 的类型
interface UserState {
  token: string | null;
  username: string | null;
}

export const useUserStore = defineStore('user', {
  // 1. 状态：存放原始数据
  state: (): UserState => ({
    token: null,
    username: null,
  }),

  // 2. 修饰：基于 state 的计算属性
  getters: {
    isLoggedIn: (state) => !!state.token,
    // 可以方便地获取用户首字母头像
    avatarLetter: (state) => state.username ? state.username[0].toUpperCase() : '?',
  },

  // 3. 动作：修改 state 的方法（支持同步和异步）
  actions: {
    // 登录成功存入数据
    setLoginInfo(token: string, username: string) {
      this.token = token;
      this.username = username;
    },

    // 退出登录清空数据
    logout() {
      this.$reset(); // 快速重置所有状态到初始值
      // 如果需要跳转，可以在组件中处理，或者在此处引入 router
    },
  },

  // 4. 持久化配置：自动与 localStorage 同步
  persist: {
    key: 'v2ex-user-storage', // 存储在 localStorage 里的名字
    storage: localStorage,    // 默认也是 localStorage
  },
});