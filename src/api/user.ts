import request from './request';

export interface Post {
  id: number;
  title: string;
  author_id: string;
  created_at: string;
  updated_at?: string;
  tag?: string;
}

// 获取用户信息
export const updateProfile = (data: { nickname?: string; bio?: string }) =>
  request.patch('/user/profile', data);

export const getMyProfile = () => request.get('/user/me');