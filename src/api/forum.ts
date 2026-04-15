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

// 发表评论 (受保护)
export const addComment = (data: { postId: number; content: string }) => {
  return request.post('/protected/comments', data);
};