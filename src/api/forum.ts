import request from './request';

/**
 * 接口说明：
 * 1. 所有的请求都会自动拼接 request.ts 中的 baseURL (例如 http://127.0.0.1:8787/api)
 * 2. 路径严格对应后端 app.route() 的挂载点
 */

export interface Post {
  id: number;
  title: string;
  author_id: string;
  created_at: string;
  updated_at?: string;
  tag?: string;
}

export const apiMe = () => request.get('/auth/me');

/**
 * 【用户身份模块】 -> 对应后端 /api/auth
 */
// 登录接口
export const login = (data: { username: string; password?: string }) => {
  return request.post('/auth/login', data);
};

// 注册接口
export const register = (data: { username: string; password?: string }) => {
  return request.post('/auth/register', data);
};


/**
 * 【内容模块】 -> 对应后端 /api/posts
 */
// 获取帖子列表 (公开)
export const getPostList = (tag?: string) => {
  return request.get('/posts', {
    params: { tag }
  });
};

// 获取帖子详情 (公开)
export const getPostDetail = (id: string | number) => {
  return request.get(`/posts/${id}`);
};

// 发布帖子 (受保护)
// 注意：后端重构后路径已简化，直接请求 /posts 即可，JWT 校验在后端处理
export const createPost = (data: { title: string; content: string; tag?: string }) => {
  return request.post('/posts', data);
};

// 发表评论 (受保护)
export const addComment = (postId: number | string, content: string) => {
  return request.post(`/posts/${postId}/comments`, {
    content: content
  });
};


/**
 * 【管理与字典模块】 -> 对应后端 /api/admin
 */

// 获取所有分类标签 (公开/准公开)
// 之前 404 是因为没加 /admin 前缀
export const getCategories = () => request.get('/admin/categories');

// 新增分类标签 (管理端)
export const addCategory = (data: { key: string; value: string; order: number }) =>
  request.post('/admin/categories', data);

// 更新分类标签 (管理端)
// 后端现在支持从 body 解析 id，所以直接传对象即可
export const updateCategory = (data: { id: number | string; key: string; value: string; order: number }) =>
  request.post('/admin/categories', data);

// 删除分类标签 (管理端)
export const deleteCategory = (id: number) =>
  request.delete(`/admin/categories/${id}`);