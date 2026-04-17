import request from './request';

export interface Post {
  id: number;
  title: string;
  author_id: string;
  created_at: string;
}

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

// 发布帖子 (受保护 - 路径对应你后端的 /api/protected/posts)
export const createPost = (data: { title: string; content: string }) => {
  return request.post('/protected/posts', data);
};

// 发表评论 (受保护 /api/protected/posts/:id/comments)
export const addComment = (postId: number | string, content: string) => {
  return request.post(`/protected/posts/${postId}/comments`, {
    content: content
  });
};

// 登录接口
export const login = (data: { username: string; password?: string }) => {
  // 注意：此处路径需对应你 Hono 后端的登录路由
  return request.post('/login', data);
};

// 注册接口
export const register = (data: { username: string; password?: string }) => {
  return request.post('/register', data);
};

/**
 * 标签字典管理接口 (Dictionary API)
 */

// 获取所有分类标签 (公开)
export const getCategories = () => request.get('/categories');

// 新增分类标签 (管理端)
export const addCategory = (data: { key: string; value: string; order: number }) =>
  request.post('/admin/categories', data);

// 更新分类标签 (管理端)
export const updateCategory = (id: number, data: { key: string; value: string; order: number }) =>
  request.post('/admin/categories', { id, ...data });

// 删除分类标签 (管理端)
export const deleteCategory = (id: number) =>
  request.delete(`/admin/categories/${id}`);
