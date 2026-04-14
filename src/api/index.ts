// my-forum-api.dusk2.workers.dev
const API_BASE = 'https://my-forum-api.dusk2.workers.dev/api';

export const api = {
  // 公开接口
  getPosts: () => fetch(`${API_BASE}/posts`).then(res => res.json()),
  getPostDetail: (id: string) => fetch(`${API_BASE}/posts/${id}`).then(res => res.json()),

  // 受保护接口 (需要 Token)
  createPost: (data: any, token: string) =>
    fetch(`${API_BASE}/protected/posts`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),

  addComment: (postId: number, content: string, token: string) =>
    fetch(`${API_BASE}/protected/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
};