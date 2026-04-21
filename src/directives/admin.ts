import { useUserStore } from "@/stores/user";

export const adminDirective = {
  mounted(el: HTMLElement) {
    const userStore = useUserStore();
    // 检查用户是否为管理员
    if (!userStore.userInfo?.isAdmin) {
      el.style.display = 'none';
    }
  }
};


