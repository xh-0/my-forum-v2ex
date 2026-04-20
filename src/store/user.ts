import { apiMe } from "@/api/forum";
import { defineStore } from "pinia";

interface UserState {
  token: string | null;
  username: string | null;
  userInfo: any;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: null,
    username: null,
    userInfo: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    avatarLetter: (state) =>
      state.username ? state.username[0].toUpperCase() : "?",
  },

  actions: {
    async fetchUserInfo() {
      const data = await apiMe();
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
