import { apiMe } from "@/api/forum";
import { defineStore } from "pinia";

interface UserState {
  token: string | null;
  username: string | null;
  userMe: any;
  userInfo: any;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: null, //用户 token
    username: null, //用户 name
    userMe: null, //api的数据
    userInfo: null, //前端的数据
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    avatarLetter: (state) =>
      state.username ? state.username[0].toUpperCase() : "?",
    getUserInfo: (state) => state.userInfo,
  },

  actions: {
    async fetchUserInfo() {
      const data = await apiMe();
      this.userMe = data;
    },

    async setUserInfo(data: any) {
      this.userInfo = data;
    },

    setLoginInfo(token: string, username: string) {
      this.token = token;
      this.username = username;
    },

    logout() {
      this.$reset();
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  persist: {
    key: "user",
    storage: localStorage,
    pick: ["token", "username"],
  },
});
