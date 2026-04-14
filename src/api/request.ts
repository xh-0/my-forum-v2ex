import axios from 'axios';

const request = axios.create({
  // 替换为你刚才部署成功的线上 Worker 地址
  baseURL: 'https://my-forum-api.dusk2.workers.dev/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器：自动注入 Token
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      // 这里的 'Bearer ' 必须要和后端 JWT 校验格式一致
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：集中处理报错
request.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      console.error('登录已过期，请重新登录');
      localStorage.removeItem('token');
      // 可以根据需求跳转到登录页：window.location.href = '/login'
    }
    return Promise.reject(error);
  }
);

export default request;