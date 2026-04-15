import request from './request';

export interface Post {
  id: number;
  title: string;
  author_id: string;
  created_at: string;
}

// 获取帖子列表 (公开)
export const getPostList = () => {
  return request.get('/posts');
};
// export const getPostList = async (): Promise<Post[]> => {
//   // 这里实现获取帖子列表的逻辑
//   const response = await fetch('/api/posts');
//   return response.json();
// }

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