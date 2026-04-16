import axios from 'axios';
import { useUserStore } from '@/store/user';
import { MessagePlugin } from 'tdesign-vue-next';

const request = axios.create({
  // 替换为你刚才部署成功的线上 Worker 地址
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器：自动注入 Token
request.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    if (userStore.token && config.headers) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：集中处理报错
request.interceptors.response.use(
  (response) => {
    // 可以在这里统一处理后端的业务 code
    // 比如：if (response.data.code !== 200) ...
    return response.data;
  },
  (error) => {
    const userStore = useUserStore();
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token 失效：调用 Store 的 logout
          // 因为开启了 persist，logout 内的 $reset 会自动清空 localStorage
          userStore.logout();

          MessagePlugin.warning('登录已过期，请重新登录');

          // 如果不在某些排除页面（如首页），则跳转
          if (window.location.pathname !== '/') {
            setTimeout(() => {
              window.location.href = '/login';
            }, 1000);
          }
          break;

        case 403:
          MessagePlugin.error('没有操作权限');
          break;

        case 500:
          MessagePlugin.error('服务器出错了，请稍后再试');
          break;

        default:
          MessagePlugin.error(error.response.data?.message || '网络请求失败');
      }
    } else {
      MessagePlugin.error('网络连接异常，请检查网络');
    }

    return Promise.reject(error);

  }
);

export default request;